import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import Config from './config/Config';
import { Sequelize } from 'sequelize/types';
import { swaggerDocument } from '../swagger';
import { NotFoundError } from './utils/ApiError';
import connection from './services/SequelizeClient';
import ErrorHandler from './middlewares/ErrorHandler';

const app: Application = express();
const PORT = Config.port || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError(req.path)));

app.use(ErrorHandler.handle());

let server: http.Server;
let dbClient: Sequelize | undefined;
const startServer = async () => {
  try {
    dbClient = await connection.sync();
    server = app.listen(PORT, (): void => {
      console.log(`Connected successfully on port ${PORT}`);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
  }
};

startServer();

ErrorHandler.initializeUnhandledException();

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (dbClient) dbClient.close();
  if (server) server.close();
});
