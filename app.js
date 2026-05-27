const express = require("express");
const knex = require("./knex");

const { initCategory } = require("./src/category_mst/index");
const { initEditdata } = require("./src/edit_data/index");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const createCategoryController = initCategory(knex);
  const createEditdataController = initEditdata(knex);

  app.get("/categorys", createCategoryController.categoryList);
  app.get("/editdata/:id", createEditdataController.editdata);

  app.post("/editdata", createEditdataController.create);

  return app;
}

module.exports = { buildApp };
