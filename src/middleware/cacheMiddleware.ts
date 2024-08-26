import { Request, Response, NextFunction } from 'express';

interface CacheableResponse extends Response {
    cacheSend: (body: any) => void;
}

export const cacheMiddleware = async (req: Request, res: CacheableResponse, next: NextFunction) => {
    const client = req.app.locals.redisClient;
    const key = `cache:${req.originalUrl}`; // Use the request URL as the cache key

    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // Store the original res.json method in res.cacheSend
        res.cacheSend = res.json.bind(res);

        // Override res.json to cache the response before sending it
        res.json = async (body) => {
            await client.set(key, JSON.stringify(body), { EX: 3600 }); // Set expiration time, 1 hour
            res.cacheSend(body);
        };

        next();
    } catch (error) {
        next(error);
    }
};