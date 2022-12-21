import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from "body-parser";
const app: Express = express();
app.use(bodyParser.json());

export default app;
