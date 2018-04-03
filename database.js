const bcrypt = require('bcrypt');
const pg = require('pg-promise')();
const dbConfig = 'postgres://ubuntu@localhost:5432/foodstache';
const db = pg(dbConfig);

let getAllRecipes = () => db.query('SELECT * FROM recipes;');

let generateILike = (column, data) => {
  let whereString = "(";
  data.forEach((item, index) => {
    whereString += `${column} ILIKE '%${item}%'`;
    if (index !== queryParams.length - 1) {
      whereString += ' OR ';
    };
  });
  whereString += ')';
  return whereString;
};

let searchRecipes = (queryParams) => {
  let where = ""
  where += generateILike('title', queryParams);
  where += ') OR (';
  where += generateILike('tag', queryParams);
  where += ') OR (';
  queryParams.forEach((item, index) => {
    where += `ingredients @> '[{"item": "${item.toLowerCase()}"}]'`;
    if (index !== queryParams.length - 1) {
      where += ' OR ';
    };
  });
  where += ')';
  console.log(where);
  return db.query(`SELECT * FROM recipes WHERE ${where};`);
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
