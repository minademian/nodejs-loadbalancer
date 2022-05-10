import express from 'express';
const app = express();

const videoServerName = process.env.APPID;

app.get('/server1', (req, res) => {
    res.send(`server: ${videoServerName} up!`);
});

app.get('/server2', (req, res) => {
    res.send(`server: ${videoServerName} up!`);
});

app.get('/server3', (req, res) => {
    res.send(`server: ${videoServerName} up!`);
});

app.listen(8079, () => console.log(`${videoServerName} is listening`));