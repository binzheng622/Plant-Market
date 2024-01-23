import express, { Request, Response } from 'express';
import plantController from '../controllers/plantController.js';

const router = express.Router();

//create user in database
router.post(
  '/signup',
  plantController.createUser,
  (req: Request, res: Response) => {
    return res.status(200).json({ status: 'added' });
  }
);

//login user and sync their data
router.post(
  '/login',
  plantController.checkUser,
  plantController.syncInfo,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

//add plant and resync data
router.post(
  '/:id',
  plantController.addPlant,
  plantController.syncInfo,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

//delete plant and resync data
router.delete(
  '/plant/:plantid',
  plantController.deletePlant,
  plantController.syncInfo,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

export default router;
