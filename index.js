const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    getAllRecipes,
    findUserByEmail,
    addNewUser
} = require('./database');

const signature = '1mm@_s3cur3_s3rv3r';

// Create JWT for user
let createToken = user =>
    jwt.sign(
        { userId: user.id },
        signature,
        { expiresIn: '7d' }
    );

let signUp = async (req, res, next) => {
    let { username, password, email, fname, lname } = req.body;
    try {
        await addNewUser(username, password, email, fname, lname);
        res.send('okay');
    } catch (e) {
        res.send('error');
    }
};

// POST /tokens
let postTokens = async (req, res) => {
    let { email, password } = req.body;
    let user = await findUserByEmail(email);
    user = user[0];
    console.log(user);
    let isValid = await bcrypt.compare(password, user.hpass);
    if (isValid) {
        let token = createToken(user);
        res.send(token);
    } else {
        res.send('No token for you!');
    }
};

// GET /api/private
let privatePage = (req, res) => {
    res.send(`Welcome to the club, user #${req.jwt.userId}`);
};

// GET /api/recipes
let allRecipes = (req, res) => {
    getAll = getAllRecipes();
    getAll.then(results => {
        console.log(results);
        res.send(results);
    });
};
//verify token middleware before accessing api route
let checkToken = async (req, res, next) => {
    let { authorization: token } = req.headers;
    let payload;
    try {
        payload = jwt.verify(token, signature);
    } catch (err) {
        // catch the error
    }
    if (payload) {
        req.jwt = payload;
        next();
    } else {
        res.send('YOU SHALL NOT PASS');
    }
};

const express = require('express');
const Router = express.Router;
const bodyParser = require('body-parser');

let app = express();
let router = new Router();

let tokensAPI = new Router();
tokensAPI.post('/', postTokens);

// tokensAPI.delete('/:id([0-9]+)', (req, res, next) => {res.send(`your id was: ${req.params.id}`)});

let api = new Router();
api.get('/private', privatePage);
tokensAPI.post('/newUser', signUp);

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

let postRecipe = (req, res) => {
  let body = req.body;
  console.log(body);
};

api.get('/recipes', allRecipes);
api.post('/recipes/search', searchRecipes);
api.post('/recipes', postRecipe);

router.get('/', (req, res) => {
    res.sendFile(__dirname+'/form.html');
});

router.use('/tokens', tokensAPI);
router.use('/api', checkToken, api);

router.use((req, res, next) => { res.send('broken') });
app.use(bodyParser.json());
app.use(router);
app.listen(3000);