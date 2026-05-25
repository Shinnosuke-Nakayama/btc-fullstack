const { createCategoryController } = require("./category_mst.controller");
const { createCategoryService } = require("./category_mst.service");
const { createCategoryRepository } = require("./category_mst.repository");

function initCategory(knex) {
  const repository = createCategoryRepository(knex);
  const service = createCategoryService(repository);
  const controller = createCategoryController(service);

  return controller;
}

module.exports = { initCategory };
