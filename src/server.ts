import express, {Express, Request, Response, NextFunction} from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {connectToDatabase} from './config/database';
import syncDatabase from './models/sync';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import categoriesRouter from "./routes/categoriesRoutes";
import commentsRouter from "./routes/reviewsRoutes";
//import { logger} from "./utils/logEvents";


const app: Express = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', userRouter);
app.use('/posts', productRouter);
app.use('/users', userRouter);
app.use('/comment', commentsRouter);
app.use('/category', categoriesRouter);
app.use('/login', userRouter);

//app.use(logger)
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log('Hello World');
    res.send('Hello World');
});

//cookies test
app.get('/set-cookies', (req: Request, res: Response, next: NextFunction) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, });
    res.send('You got the cookies!');
});
app.get('/read-cookies', (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies);
});

// Connect to database and sync models before starting the server
connectToDatabase()
    .then(() => syncDatabase())
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error during initialization:', error);
        process.exit(1);
    });