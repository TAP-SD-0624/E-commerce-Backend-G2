import express, {Express, Request, Response, NextFunction} from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import {db, syncDatabase} from './database';
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
import productRouter from "./routes/productRoutes";
///////////////////////////////////////////////////////////////////
// import amrFakeRouter from './controllers/amr/amrFakeRouter';
///////////////////////////////////////////////////////////////////
const app: Express = express();

const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
syncDatabase();


app.use('/users', userRouter)
app.use('/admin', adminRouter)
app.use('/login', userRouter);
app.use('/logout', userRouter);
app.use('/products', productRouter);


//amr testing //////////////////////////////////////////////////////////////////////////
// app.use('/amr', amrFakeRouter);
////////////////////////////////////////////////////////////////////////////////

// app.use('/posts', productRouter);
// app.use('/users', userRouter);
// app.use('/comment', commentsRouter);
// app.use('/category', categoriesRouter);

// app.use(logger)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    // db.Users.create({
    //     firstName: 'ahmed',
    //     lastName: 'mmm',
    //     DOB: Date.now(),
    //     image: 'niodasndioas/dwadaw'
    // });
});
//cookies test
app.get('/set-cookies', (req: Request, res: Response, next: NextFunction) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24});
    res.send('You got the cookies!');
});
app.get('/read-cookies', (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);
    res.json(cookies);
});
// Connect to database and sync models before starting the server

sequelize.sync({alter: true}).then(() => {
    console.log('databaseSync');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
