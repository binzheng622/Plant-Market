import { RequestHandler } from 'express';

export interface ServerError {
  log: string;
  status: number;
  message: { err: string };
}

export interface plantControllerType {
  createUser: RequestHandler;
  checkUser: RequestHandler;
  addPlant: RequestHandler;
  deletePlant: RequestHandler;
  syncInfo: RequestHandler;
}

export interface loginType {
  email: string;
  password: string;
}

export interface signUpType extends loginType {
  username: string;
}
