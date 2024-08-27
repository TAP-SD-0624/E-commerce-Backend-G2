import { Request, Response, NextFunction } from 'express';

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const client = req.app.locals.redisClient;
    const key = `cache:${req.originalUrl}`;

    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            res.setHeader('X-Data-Source', 'cache'); // Indicate data is from cache
            console.log('cashed 🤩')
            return res.json(JSON.parse(cachedData));

        }

        const originalJson = res.json.bind(res);

            res.json = (body) => {
            // If no cached data, generate and cache the response
         client.set(key, JSON.stringify(body), { EX: 3600 });
            res.setHeader('X-Data-Source', 'database');
            console.log("database 🥳")
            return originalJson(body);
        };

        next();
    } catch (error) {
        next(error);
    }
};



