import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import {router as items} from './routes/items';

const app = express();
const port = process.env.APP_PORT || 3000;
app.use(bodyParser.json());
app.use('/items', items);

/** Error handling for unknown routes */
app.use((req, res, next) => {
    const error = new Error('Page not currently available.');
    return res.status(404).json({
        message: error.message
    });
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`HTTP server Listening on port ${port}!`);
});

