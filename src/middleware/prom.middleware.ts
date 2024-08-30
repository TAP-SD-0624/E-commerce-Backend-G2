import { Response, Request } from 'express';
import { restResponseTimeHistogram } from '../utils/prom.utils';

export function respTime(req: Request, res: Response, time: number) {
    if (req?.route?.path) {
        restResponseTimeHistogram.observe(
            {
                method: req.method,
                route: req.route.path,
                status_code: res.statusCode
            },
            time / 1000
        );
    }
}
