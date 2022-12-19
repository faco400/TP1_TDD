import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";

const app: Express = express();
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ message: 'Hello World!' });
});

export default app;
