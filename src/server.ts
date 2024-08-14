import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { db, syncDatabase } from './database';
import userRouter from './routes/userRoutes';
import adminRouter from './routes/adminRoutes';
import productRouter from './routes/productRoutes';
import { errorMiddleware } from './middleware/customError';

const app: Express = express();

const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

syncDatabase();

// user routes
app.use('/', userRouter);
app.use('/register', userRouter);
app.use('/login', userRouter);
app.use('/logout', userRouter);
app.use('/update', userRouter);
app.use('/profile', userRouter);

app.use(errorMiddleware);

sequelize.sync({ alter: true }).then(() => {
    console.log('databaseSync');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
