import {Request, Response, NextFunction} from 'express';
import { logEvents } from './logEvents';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt').then(result => console.log(result));
    console.error(err.stack)
    res.status(500).send(err.message);
}

