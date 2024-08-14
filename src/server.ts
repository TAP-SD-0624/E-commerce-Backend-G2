import express, { Express } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { syncDatabase } from './database';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import productRouter from './routes/productsRoutes';
import { homePageController } from './controllers/homePageController';
import { errorHandler } from './middleware/errorHandler';
import { createServer } from 'http';

export const app: Express = express();
const server = createServer(app);

export const shutdown = () => {
    server.close();
};
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
syncDatabase();

app.use('/register', userRouter);
app.use('/login', userRouter);
app.use('/logout', userRouter);

app.use('/products', productRouter);

app.get('/homePage', homePageController);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    sequelize
        .authenticate()
        .then(async () => {
            console.log('connected to the database');
            await sequelize.sync({ alter: true });
        })
        .catch(() => console.log('couldnt connect to the database'));
}
server.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});
