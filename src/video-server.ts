import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { videoServerPayload } from './data';
const app = express();

app.use(bodyParser.json());

const serverResponse = (serverName: string, req: Request, res: Response) => {
  console.log(`${serverName} active, receiving request payload `, req.body);
  if (Object.keys(req.body).length === 0) res.sendStatus(500);
  res.send(videoServerPayload);
};

app.post('/server1', (req, res) => serverResponse('video1.case.nimbra.io', req, res));
app.post('/server2', (req, res) => serverResponse('video2.case.nimbra.io', req, res));
app.post('/server3', (req, res) => serverResponse('video3.case.nimbra.io', req, res));

app.listen(8079, () => console.log(`video server is listening`));
