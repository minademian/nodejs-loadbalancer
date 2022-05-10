import express, { Request, Response } from 'express';
import { loadBalancerPayload, videoServerPayload, clientPayload } from 'data';
import axios from 'axios';
const app = express();


const port = process.env.PORT || 8080;

const appServers = [
    'localhost:8081',
    'localhost:8082',
    'localhost:8083',
];

let ServerIndex = 0, currentServer;

const loadBalancer = async (req: Request, res: Response) => {
    const { method, url, headers, body: data } = req;

    currentServer = appServers[ServerIndex];
    ServerIndex === (appServers.length - 1) ? currentServer = 0 : currentServer;
    
    try {
        const videoServerPoll = await axios({
            url: `${currentServer}/${url}`,
            method,
            data
        });
        console.log(`proxy to ${currentServer} succeeded`);
        res.send(videoServerPoll.data);
    }
    catch(err) {
        console.log(`proxy to ${currentServer} failed`);
        loadBalancer(req, res);
    }
    console.log(url);
    console.log('PING!');
    res.send(loadBalancerPayload);
};

app.post('/allocateStream', loadBalancer);

app.listen(port);
