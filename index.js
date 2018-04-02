const express = require('express');
const Router = express.Router;
const bodyParser = require('body-parser');

let app = express();
let router = new Router();

let api = new Router();

router.use('/', (req, res) => {
  res.send('Hello!');
});

app.use(router);
app.listen(3000);