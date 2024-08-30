import express, { Express, Response, Request } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { syncDatabase } from './database';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productsRoutes';
import redisRouter from './routes/redisRoutes';
import { homePageController } from './controllers/homePageController';
import { errorHandler } from './middleware/errorHandler';
import { createServer } from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import cartRouter from './routes/cartRoutes';
import AdminRouter from './routes/adminRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import responseTime from 'response-time';
import { respTime } from './middleware/prom.middleware';
import { firePromServer } from './utils/prom.utils';
import { createClient } from 'redis';

export const app: Express = express();
export const server = createServer(app);
export const shutdown = () => {
    server.close();
};

const PORT: number | string = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(responseTime(respTime));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/admin', AdminRouter);

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const client = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500),
    },
});

client.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

async function startServer() {
    try {
        await syncDatabase();
        await client.connect();
        console.log('Connected to Redis server');
        app.locals.redisClient = client;

        app.use('/products', productRouter);
        app.get('/homePage', homePageController);

        app.use('/redis', redisRouter);

        app.use('/', (req: Request, res: Response): Response => {
            return res.sendStatus(404);
        });

        app.use(errorHandler);

        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connected to the database');

        firePromServer();

        server.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); // Exit with failure
    }
}

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

// Shutdown sequence
process.on('SIGINT', async () => {
    console.log('Gracefully shutting down...');
    try {
        await client.quit(); // Close the Redis connection
        console.log('Redis client disconnected on app termination');

        shutdown(); // Close the server
        console.log('HTTP server closed on app termination');
    } catch (err) {
        console.error('Error while shutting down:', err);
    } finally {
        process.exit(0); // Ensure the application exits
    }
});