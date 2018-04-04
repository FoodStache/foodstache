const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    getAllRecipes,
    searchRecipes,
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
// POST /tokens/newUser
let signUp = async (req, res, next) => {
    let { username, password, email, fname, lname } = req.body;
    try {
        await addNewUser(username, password, email, fname, lname);
        res.json({ status: 'okay' });
    } catch (e) {
        res.json({ status: 'error' });
    }
};

// POST /tokens
let postTokens = async (req, res) => {
    let { email, password } = req.body;
    console.log('Im here');
    let user = await findUserByEmail(email);
    user = user[0];
    console.log(user);
    let isValid = await bcrypt.compare(password, user.hpass);
    if (isValid) {
        let token = createToken(user);
        res.json({ token });
    } else {
        res.json({ status: 'No token for you!' });
    }
};

// GET /api/private
let privatePage = (req, res) => {
    // res.send(`Welcome to the club, user #${req.jwt.userId}`);
    res.send('sup dude you are logged in');
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

let app = express();
let router = new Router();

let tokensAPI = new Router();
tokensAPI.post('/', postTokens);

// tokensAPI.delete('/:id([0-9]+)', (req, res, next) => {res.send(`your id was: ${req.params.id}`)});

let api = new Router();
api.get('/private', privatePage);
tokensAPI.post('/newUser', signUp);

let searchForRecipes = (req, res) => {
    let queryRegex = /\?q=([a-zA-z0-9+]+)/;
    let queryParams = queryRegex.exec(req.url)[1].split('+');
    console.log(queryParams);
    getSearch = searchRecipes(queryParams);
    getSearch.then(results => {
        console.log(results);
        res.send(results);
    });
};

let postRecipe = (req, res) => {
    let body = req.body;
    console.log(body);
    res.send(body);
};

api.get('/recipes', allRecipes);
api.get('/recipes/search', searchForRecipes);
api.post('/recipes', postRecipe);

router.use('/tokens', tokensAPI);
router.use('/api', api);

router.use((req, res, next) => {
    res.sendFile(__dirname + `/client${req.url}`);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(router);
app.listen(3000);