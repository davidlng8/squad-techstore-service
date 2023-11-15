import express from 'express';
import {router as items} from './routes/items';

const app = express();
const port = process.env.APP_PORT || 3000;
app.use(express.json());
app.use('/api-items', items);

/** Error handling for unknown routes */
app.use((req, res, next) => {
    const error = new Error('Page not currently available.');
    return res.status(404).json({
        message: error.message
    });
});

app.listen(port, () => {
    console.log(`HTTP server Listening on port ${port}!`);
});

export default app;
