const db = require('../models/userModel');
const bcrypt = require('bcrypt');

const plantController = {};

//create user
plantController.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userEmail = [email];
    const findUser = 'SELECT * FROM users WHERE email = $1';

    //check if email is already in database
    const result = await db.query(findUser, userEmail);

    //if user input all data and email is not in database
    if (
      username.length &&
      email.length &&
      password.length &&
      result.rows.length < 1
    ) {
      //hash password and create user in database
      const hashPassword = await bcrypt.hash(password, 10);
      const userInfo = [username, email, hashPassword];
      const createUser =
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';

      const addUser = await db.query(createUser, userInfo);

      //send user to login page
      return next();
    } else {
      //if user input incorrect, sent to signup page
      return res.status(400).redirect('/signup');
    }
  } catch (err) {
    return next({
      log: `plantController.createUser ERROR: ${err}`,
      status: 500,
      message: { err: 'Unable to create user' },
    });
  }
};

//check user
plantController.checkUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = [email];
    const findUser = 'SELECT * FROM users WHERE email = $1';

    //check if user is in database
    const result = await db.query(findUser, userEmail);

    //if user is in database
    if (result.rows.length > 0) {
      //compare if hash password match database password
      const hashMatch = await bcrypt.compare(password, result.rows[0].password);

      //if password is a match
      if (hashMatch) {
        res.locals.userID = result.rows[0].id;

        //send user to personal page
        return next();
      } else {
        //if password dont match, send to signup page
        return res.status(400).redirect('/signup');
      }
    } else {
      //if user not found, send to signup page
      return res.status(400).redirect('/signup');
    }
  } catch (err) {
    return next({
      log: `plantController.checkUser ERROR: ${err}`,
      status: 500,
      message: { err: 'Unable to check user' },
    });
  }
};

//add plant to user database
plantController.addPlant = async (req, res, next) => {
  const userID = req.params.id;
  const { plantName } = req.body;
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

        const plantInfo = [
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
        return res.status(400).redirect(`/${userID}`);
      }
      //user did not put any name
    } else {
      return res.status(400).redirect(`/${userID}`);
    }
  } catch (err) {
    return next({
      log: `plantController.addPlant ERROR: ${err}`,
      status: 500,
      message: { err: 'Unable to add plant' },
    });
  }
};

//delete plant from user database
plantController.deletePlant = async (req, res, next) => {
  try {
    const plantID = [req.params.plantid];
    const deletePlant = 'DELETE FROM plants WHERE id = $1';

    //delete plant from database
    const result = await db.query(deletePlant, plantID);

    //send user back to personal page
    return next();
  } catch (err) {
    return next({
      log: `plantController.deletePlant ERROR: ${err}`,
      status: 500,
      message: { err: 'Unable to delete plant' },
    });
  }
};

//sync user data based on userid
plantController.syncInfo = async (req, res, next) => {
  try {
    const userID = [req.params.id];
    const userName = 'SELECT * FROM users WHERE id = $1';
    const plantData = 'SELECT * FROM plants WHERE plantownerid = $1';

    //find username and user plantlist
    const userResult = await db.query(userName, userID);
    const plantResult = await db.query(plantData, userID);

    //save userinfo to be sent to store
    res.locals.userInfo = {
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
};

module.exports = plantController;
