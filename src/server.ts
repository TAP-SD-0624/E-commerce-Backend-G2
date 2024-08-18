import express, {Express} from 'express';import cors from 'cors';import sequelize from './database/connection';import { syncDatabase} from './database';import userRouter from "./routes/userRoutes";import * as http from 'node:http';import transactionRouter from './routes/transactionRoutes';export const app: Express = express();export const httpServer =  http.createServer(app);export const shutdown = ()=> {  httpServer.close()}const PORT: number | string = process.env.PORT || 3000;app.use(express.json());app.use(cors());app.use(express.urlencoded({extended: true}));syncDatabase();// user routesapp.use('/', userRouter);app.use('/register', userRouter);app.use('/login', userRouter);app.use('/cart',transactionRouter);sequelize.sync({alter: true}).then(() => {    httpServer.listen(PORT, () => {        console.log(`Server is running on port ${PORT}`);    });});