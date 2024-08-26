import { Request, Response, NextFunction } from 'express';

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const client = req.app.locals.redisClient;
    const key = `cache:${req.originalUrl}`;

    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        const originalJson = res.json.bind(res);

        res.json = (body) => {
            client.set(key, JSON.stringify(body), { EX: 3600 }) // Set expiration time, e.g., 1 hour
                .catch((err: Error) => console.error('Failed to cache response:', err));
            return originalJson(body);
        };

        next();
    } catch (error) {
        next(error);
    }
};