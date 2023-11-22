const path = require('path');
const express = require('express');

const plantController = require('./controllers/plantController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../build')));

//sign up page create user in database
app.post('/signup', plantController.createUser, (req, res) =>
  res.status(200).redirect('/')
);

//personal page get request to sync data
app.get('/data/:id', plantController.syncInfo, (req, res) =>
  res.status(200).json(res.locals.userInfo)
);

//delete plant from user plant list
app.delete('/plant/:plantid', plantController.deletePlant, (req, res) =>
  res.status(200).redirect(`/${res.locals.userID}`)
);

//personal page add plant to personal plantlist in database
app.post('/:id', plantController.addPlant, (req, res) =>
  res.status(200).redirect(`/${res.locals.userID}`)
);

//login in page check if user is in database
app.post('/', plantController.checkUser, (req, res) =>
  res.status(200).redirect(`/${res.locals.userID}`)
);

//serve index.html to all path
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
);

//wrong page error 404
app.use((req, res) => res.status(404).send('Page Not Found'));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
