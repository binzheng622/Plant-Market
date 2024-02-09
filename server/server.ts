import express, { Request, Response, NextFunction } from 'express';
import userRouter from './routers/userRouter.js';
import { ServerError } from '../types';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(process.cwd() + '/build'));

app.use('/api', userRouter);

//wrong page error 404
app.use((req: Request, res: Response) =>
  res.status(404).send('Page Not Found')
);

//global error handler
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
