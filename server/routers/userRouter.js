const path = require('path');
const express = require('express');

const plantController = require('../controllers/plantController');

const router = express.Router();

//create user in database
router.post('/signup', plantController.createUser, (req, res) => {
  return res.status(200).json('Added');
});

//login user and sync their data
router.post(
  '/login',
  plantController.checkUser,
  plantController.syncInfo,
  (req, res) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

//add plant and resync data
router.post(
  '/:id',
  plantController.addPlant,
  plantController.syncInfo,
  (req, res) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

//delete plant and resync data
router.delete(
  '/plant/:plantid',
  plantController.deletePlant,
  plantController.syncInfo,
  (req, res) => {
    return res.status(200).json(res.locals.userInfo);
  }
);

module.exports = router;
