const bcrypt = require('bcrypt');
const pg = require('pg-promise')();
// const dbConfig = 'postgres://james@localhost:5432/jwt-einfach';
const dbConfig = 'postgres://ubuntu@localhost:5432/foodstache';
const db = pg(dbConfig);

let getAllRecipes = () => db.query('SELECT * FROM recipes;');

let addNewUser = async (username, password, email, fname, lname) => {
  let hpass = await bcrypt.hash(password, 10);
  return db.query(`INSERT INTO users (username, hpass, email, fname, lname) VALUES ('${username}', '${hpass}', '${email}', '${fname}', '${lname}')`);
}

let findUserByEmail = async (email) => {
  return db.query(`SELECT * FROM users WHERE email='${email}'`);
}

module.exports = {
  getAllRecipes,
  findUserByEmail,
  addNewUser
};