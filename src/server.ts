import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { db, syncDatabase } from './database';
import userRouter from "./routes/userRoutes";

const app: Express = express();

const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
syncDatabase();

app.use('/', userRouter)


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('hello server')
    });



sequelize.sync({ alter: true }).then(() => {
    console.log('databaseSync');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
