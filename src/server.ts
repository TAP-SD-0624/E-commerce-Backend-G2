import express, { Express, Response, Request } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { syncDatabase } from './database';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productsRoutes';
import { homePageController } from './controllers/homePageController';
import { errorHandler } from './middleware/errorHandler';
import { createServer } from 'http';
syncDatabase();
export const app: Express = express();
const server = createServer(app);
export const shutdown = () => {
    server.close();
};

const PORT: number | string = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/products', productRouter);
app.get('/homePage', homePageController);
app.use(errorHandler);
app.use('/', (req: Request, res: Response): Response => {
    return res.sendStatus(404);
});

if (process.env.NODE_ENV !== 'test') {
    sequelize
        .authenticate()
        .then(async () => {
            await sequelize.sync({ alter: true });
            console.log('connected to the database');
        })
        .catch(() => console.log('couldnt connect to the database'));
}
server.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
