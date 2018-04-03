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

let searchRecipes = (req, res) => {
  let body = req.body;
  console.log(body);
  let queryParams = body["query"];
  getSearch = db.searchRecipes(queryParams);
  getSearch.then(results => {
    console.log(results);
    res.send(results);
  });
};

api.get('/recipes', allRecipes);
api.post('/recipes/search', searchRecipes);

router.use('/api', api);
router.get('/', (req, res) => {
  res.send('Hello!');
});

app.use(bodyParser.json());
app.use(router);
app.listen(3000);