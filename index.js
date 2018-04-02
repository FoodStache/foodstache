const express = require('express');
const Router = express.Router;
const bodyParser = require('body-parser');

const db = require('./database');

let app = express();
let router = new Router();

let api = new Router();

let allRecipes = (req, res) => {
  getAll = db.getAllRecipes();
  getAll.then(results => {
    console.log(results);
    res.send(results);
  });
};

api.get('/recipes', allRecipes);

router.use('/api', api);
router.use('/', (req, res) => {
  res.send('Hello!');
});

app.use(router);
app.listen(3000);