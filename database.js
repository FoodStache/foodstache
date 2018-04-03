const pg = require('pg-promise')();
const dbConfig = 'postgres://ubuntu@localhost:5432/foodstache';
const db = pg(dbConfig);

let getAllRecipes = () => db.query('SELECT * FROM recipes;');

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
    whereString += `ingredients @> 'item: ${item.toLowerCase()}'`;
    if (index !== queryParams.length - 1) {
      whereString += ' OR ';
    };
  });
  whereString += ')';
  console.log(whereString);
  return db.query(`SELECT * FROM recipes WHERE ${whereString};`);
};

module.exports = {
  getAllRecipes: getAllRecipes,
  searchRecipes: searchRecipes
};