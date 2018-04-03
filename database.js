const bcrypt = require('bcrypt');
const pg = require('pg-promise')();
// const dbConfig = 'postgres://james@localhost:5432/jwt-einfach';
const dbConfig = 'postgres://ubuntu@localhost:5432/foodstache';
const db = pg(dbConfig);

let getAllRecipes = () => db.query('SELECT * FROM recipes;');

let generateWhere = (column, data) => {
  // TODO: Functionalize string generation
};

let searchRecipes = (queryParams) => {
  let whereString = "(";
  queryParams.forEach((item, index) => {
    whereString += `title ILIKE '%${item}%'`;
    if (index !== queryParams.length - 1) {
      whereString += ' OR ';
    };
  });
  whereString += ') OR (';
  queryParams.forEach((item, index) => {
    whereString += `tag ILIKE '%${item}%'`;
    if (index !== queryParams.length - 1) {
      whereString += ' OR ';
    };
  });
  whereString += ') OR (';
  queryParams.forEach((item, index) => {
    whereString += `ingredients @> '[{"item": "${item.toLowerCase()}"}]'`;
    if (index !== queryParams.length - 1) {
      whereString += ' OR ';
    };
  });
  whereString += ')';
  console.log(whereString);
  return db.query(`SELECT * FROM recipes WHERE ${whereString};`);
};

let addNewUser = async (username, password, email, fname, lname) => {
  let hpass = await bcrypt.hash(password, 10);
  return db.query(`INSERT INTO users (username, hpass, email, fname, lname) VALUES ('${username}', '${hpass}', '${email}', '${fname}', '${lname}')`);
}

let findUserByEmail = async (email) => {
  return db.query(`SELECT * FROM users WHERE email='${email}'`);
}

module.exports = {
  getAllRecipes,
  searchRecipes,
  findUserByEmail,
  addNewUser
};
