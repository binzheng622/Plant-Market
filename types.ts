import { RequestHandler } from 'express';

export interface ServerError {
  log: string;
  status: number;
  message: { err: string };
}
