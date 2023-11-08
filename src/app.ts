import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());

const server = http.createServer(app);

/*app.get('/', (req, res) => {
    res.send('Ready to start builing out the API Endpoints');
}); */

server.listen(port, () => {
    console.log(`HTTP server Listening on port ${port}!`);
});
