const express = require("express");
const knex = require("./knex");

const { initBackEnd } = require("./src/index");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const createController = initBackEnd(knex);
  app.get("/categorys", createController.categoryList);

  return app;
}

module.exports = { buildApp };
