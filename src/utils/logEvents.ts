import {format} from 'date-fns';
import {v4 as uuid} from 'uuid';
import fs from 'fs';
import fsPromises from 'fs';
import path from 'path';
import {Request, Response, NextFunction} from 'express';

export const logEvents = async (message: string, logName: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.promises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        await fsPromises.promises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt').then(() => {
        next();
    })
        .catch((err) => {
            console.log(err);
        });
    console.log(`${req.method} ${req.path}`);
    next();
}

