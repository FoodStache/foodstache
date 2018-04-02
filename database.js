const pg = require('pg-promise')();
const dbConfig = 'postgres://ubuntu@localhost:5432/foodstache';
const db = pg(dbConfig);

let getAllRecipes = () => db.query('SELECT * FROM recipes;');

module.exports = {
  getAllRecipes: getAllRecipes
};