import Router from 'express';
import { Request, Response } from 'express';


const redisRouter = Router();

redisRouter.get('/redis', async (req: Request, res: Response) => {
    const client = req.app.locals.redisClient;
    const testKey = 'test:key';
    const testValue = 'Hello, Redis!';

    try {

        await client.set(testKey, testValue, { EX: 3600 }); // Expires in 1 hour

        const value = await client.get(testKey);

        return res.json({ value });
    } catch (err) {
        console.error('Redis Test Error:', err);
        return res.status(500).json({ error: 'Redis Test Failed' });
    }
});

export default redisRouter;