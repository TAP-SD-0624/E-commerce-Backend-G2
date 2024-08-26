import express, { Express, Response, Request } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { db, syncDatabase } from './database';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productsRoutes';
import { homePageController } from './controllers/homePageController';
import { errorHandler } from './middleware/errorHandler';
import { createServer } from 'http';
import helmet from 'helmet';
import cartRouter from './routes/cartRoutes';
import { createClient } from 'redis';

syncDatabase();
export const app: Express = express();
export const server = createServer(app);
export const shutdown = () => {
    server.close();
};

const PORT: number | string = process.env.PORT || 3000;
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/products', productRouter);
app.get('/homePage', homePageController);
app.use('/cart', cartRouter);

app.use('/', (req: Request, res: Response): Response => {
    return res.sendStatus(404);
});

app.use(errorHandler);

// Get Redis URL from .env or use default local URL
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// Create Redis client instance with retry strategy
export const client = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500),
    },
});

// Set up error event listener
client.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

// Store Redis client in app locals
app.locals.redisClient = client;

// Connect to Redis
async function connectToRedis() {
    try {
        await client.connect();
        console.log('Connected to Redis server');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
}

connectToRedis();

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

if (process.env.NODE_ENV !== 'test') {
    sequelize
        .authenticate()
        .then(async () => {
            await sequelize.sync({ alter: true });
            console.log('connected to the database');
        })
        .catch(() => console.log('couldnt connect to the database'));
    server.listen(PORT, () => {
        console.log(`server is listening at port ${PORT}`);
    });
}
