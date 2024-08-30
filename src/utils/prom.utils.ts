import express from 'express';
import client from 'prom-client';

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_API_response_time',
    help: 'rest api response time in seconds',
    labelNames: ['method', 'route', 'status_code']
});
export const databaseResponseTimeHistogram = new client.Histogram({
    name: 'database_response_time',
    help: 'database response time in seconds',
    labelNames: ['operation', 'success']
});
const collectDefaultMetrics = client.collectDefaultMetrics();

export function firePromServer() {
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', client.register.contentType);
        return res.send(await client.register.metrics());
    });

    app.listen(3030, () => {
        console.log('prom server is on 3030');
    });
}
