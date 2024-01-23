import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import db from '../models/userModel.js';
import { plantControllerType, signUpType, loginType } from '../../types';

const plantController: plantControllerType = {
  //create user in database
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password }: signUpType = req.body;
    try {
      const userEmail: string[] = [email];
      const findUser = 'SELECT * FROM users WHERE email = $1';

      //check if email is already in database
      const result = await db.query(findUser, userEmail);

      //if user input data and email is not in database
      if (
        username.length &&
        email.length &&
        password.length &&
        result.rows.length < 1
      ) {
        //hash password and create user in database
        const hashPassword = await bcrypt.hash(password, 10);
        const userInfo: string[] = [username, email, hashPassword];
        const createUser =
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';

        const addUser = await db.query(createUser, userInfo);

        return next();
      } else {
        //if user input incorrect data
        return res.sendStatus(400);
      }
    } catch (err) {
      return next({
        log: `plantController.createUser ERROR: ${err}`,
        status: 500,
        message: { err: 'Unable to create user' },
      });
    }
  },

  //check user login
  checkUser: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: loginType = req.body;
    try {
      const userEmail: string[] = [email];
      const findUser = 'SELECT * FROM users WHERE email = $1';

      //check if user is in database
      const result: any = await db.query(findUser, userEmail);

      //if user is in database
      if (result.rows.length > 0) {
        //compare if hash password match database password
        const hashMatch = await bcrypt.compare(
          password,
          result.rows[0].password
        );

        //if password is a match
        if (hashMatch) {
          res.locals.userID = result.rows[0].id;

          //send user to personal page
          return next();
        } else {
          //if password dont match
          return res.sendStatus(400);
        }
      } else {
        //if user not found in database
        return res.sendStatus(400);
      }
    } catch (err) {
      return next({
        log: `plantController.checkUser ERROR: ${err}`,
        status: 500,
        message: { err: 'Unable to check user' },
      });
    }
  },

  //add plant to user database
  addPlant: async (req: Request, res: Response, next: NextFunction) => {
    const userID: string = req.params.id;
    const { plantName }: { plantName: string } = req.body;
    try {
      //check if user input plant name
      if (plantName) {
        //fetch plant data from API with user input plant name
        const fetchResponse = await fetch(
          `https://perenual.com/api/species-list?key=${process.env.PLANT_API}&q=${plantName}`
        );
        const data = await fetchResponse.json();

        //if data return with 1 or more find
        if (data.data.length > 0) {
          //clean data for database entry
          const plant = data.data[0];
          const plantName = plant.scientific_name[0];
          const plantSun = plant.sunlight[0];
          const plantWater = plant.watering;
          const plantOwnerId = userID;
          const imageUrl = plant.default_image.original_url;

          const plantInfo: string[] = [
            plantName,
            plantSun,
            plantWater,
            plantOwnerId,
            imageUrl,
          ];

          const createPlant =
            'INSERT INTO plants (plantname, plantsun, plantwater, plantownerid, imageurl) VALUES ($1, $2, $3, $4, $5)';

          //add plant to user database
          const addPlant = await db.query(createPlant, plantInfo);
          res.locals.userID = userID;

          //send user back to personal page
          return next();
          //could not find user plant name in API database
        } else {
          return res.sendStatus(400);
        }
        //user did not put any name
      } else {
        return res.sendStatus(400);
      }
    } catch (err) {
      return next({
        log: `plantController.addPlant ERROR: ${err}`,
        status: 500,
        message: { err: 'Unable to add plant' },
      });
    }
  },

  //delete plant from user database
  deletePlant: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId }: { userId: string } = req.body;
      const plantID: string[] = [req.params.plantid];
      const deletePlant = 'DELETE FROM plants WHERE id = $1';

      //delete plant from database
      const result = await db.query(deletePlant, plantID);
      res.locals.userID = userId;

      //send user back to personal page
      return next();
    } catch (err) {
      return next({
        log: `plantController.deletePlant ERROR: ${err}`,
        status: 500,
        message: { err: 'Unable to delete plant' },
      });
    }
  },

  //sync/resync user data based on userid
  syncInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID: string[] = [res.locals.userID];
      const userName = 'SELECT * FROM users WHERE id = $1';
      const plantData = 'SELECT * FROM plants WHERE plantownerid = $1';

      //find username and user plantlist
      const userResult: any = await db.query(userName, userID);
      const plantResult: any = await db.query(plantData, userID);

      //save userinfo to be sent to redux store
      res.locals.userInfo = {
        id: res.locals.userID,
        username: userResult.rows[0].username,
        plantList: plantResult.rows,
      };

      //send user back to personal page
      return next();
    } catch (err) {
      return next({
        log: `plantController.syncInfo ERROR: ${err}`,
        status: 500,
        message: { err: 'Unable to sync data with store' },
      });
    }
  },
};

export default plantController;
