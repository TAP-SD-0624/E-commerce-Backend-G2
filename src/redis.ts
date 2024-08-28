//! this code should be in the server.ts file

// // Get Redis URL from .env or use default local URL
// import { createClient } from 'redis';
//
// const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
//
// // Create Redis client instance with retry strategy
// export const client = createClient({
//     url: redisUrl,
//     socket: {
//         reconnectStrategy: (retries) => Math.min(retries * 50, 500),
//     },
// });
//
// client.on('error', (err) => {
//     console.error('Redis Client Error:', err);
// });
//
// async function connectToRedis() {
//     try {
//         await client.connect();
//         console.log('Connected to Redis server');
//         app.locals.redisClient = client; // Ensure this is set before defining routes
//
//         // Now define routes after Redis is connected
//         app.use('/products', productRouter);
//         app.get('/homePage', homePageController);
//
//
//         app.use('/', (req: Request, res: Response): Response => {
//             return res.sendStatus(404);
//         });
//
//         app.use(errorHandler);
//
//         if (process.env.NODE_ENV !== 'test') {
//             sequelize
//                 .authenticate()
//                 .then(async () => {
//                     await sequelize.sync({ alter: true });
//                     console.log('Connected to the database');
//                 })
//                 .catch(() => console.log('Could not connect to the database'));
//
//             server.listen(PORT, () => {
//                 console.log(`Server is listening at port ${PORT}`);
//             });
//         }
//     } catch (err) {
//         console.error('Failed to connect to Redis:', err);
//     }
// }
//
// connectToRedis();
//
// // Shutdown sequence
// process.on('SIGINT', async () => {
//     console.log('Gracefully shutting down...');
//     try {
//         await client.quit(); // Close the Redis connection
//         console.log('Redis client disconnected on app termination');
//
//         shutdown(); // Close the server
//         console.log('HTTP server closed on app termination');
//     } catch (err) {
//         console.error('Error while shutting down:', err);
//     } finally {
//         process.exit(0); // Ensure the application exits
//     }
// });
