const path = require('path');
const express = require('express');

const plantController = require('../controllers/plantController');

const router = express.Router();

router.use(express.static(path.resolve(__dirname, '../../build')));

//sign up page create user in database
router.get('/signup', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
);

router.post('/signup', plantController.createUser, (req, res) =>
  res.status(200).redirect('/')
);

//login in page check if user is in database
router.post('/login', plantController.checkUser, (req, res) =>
  res.status(200).redirect(`/${res.locals.userID}`)
);

//personal page add plant to personal plantlist in database
router.get('/:id', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../../build/index.html'))
);

router.post('/:id', plantController.addPlant, (req, res) =>
  res.status(200).redirect(`/${res.locals.userID}`)
);

//delete plant from user plant list
router.delete('/plant/:plantid', plantController.deletePlant, (req, res) =>
  res.sendStatus(200)
);

//personal page get request to sync data
router.get('/data/:id', plantController.syncInfo, (req, res) =>
  res.status(200).json(res.locals.userInfo)
);

module.exports = router;
