import express, { Express, NextFunction, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ message: 'Hello World!' });
});


console.log('IRPF - TECPROG')

export default app;
