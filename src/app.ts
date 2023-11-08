import express from "express";

const app = express();
const port = process.env.port || 30000;

app.get('/', (req, res) => {
    res.send('Ready to start builing out the API Endpoints');
});  
  
app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});
