import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
// TODO: simulate slow API response with https://www.codebyamir.com/blog/mock-a-slow-api-response-using-rapidmock
const appServers = ['http://localhost:8079/server1', 'http://localhost:8079/server2', 'http://localhost:8079/server3'];
const MAX_RETRIES = appServers.length;
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

let ServerIndex = 0,
  currentServer;

const loadBalancer = async (req: Request, res: Response, attemptCount) => {
  attemptCount = attemptCount ? attemptCount : 0;

  currentServer = appServers[ServerIndex];
  ServerIndex === appServers.length - 1 ? (ServerIndex = 0) : ServerIndex++;
  const videoServeResource = `${currentServer}`;

  attemptCount++;
  if (attemptCount > MAX_RETRIES) {
    res.status(500).send('All video servers returned 500.');
  } else {
    try {
      console.log(`Load balancer is forwarding payload!`, req.body);
      const videoServerPoll = await axios({ url: videoServeResource, method: 'post', data: req.body, timeout: 1000 });
      res.send(videoServerPoll.data);
    } catch (err) {
      console.log(`proxy to ${currentServer} failed, ${err}`);
      loadBalancer(req, res, attemptCount);
    }
  }
};

app.use((req, res) => {
  loadBalancer(req, res, 0);
});

app.get('/', (req, res) => res.sendStatus(200));
app.listen(port);
