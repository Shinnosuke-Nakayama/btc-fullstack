const { createEditdataController } = require("./edit_data.controller");
const { createEditdataService } = require("./edit_data.service");
const { createEditdataRepository } = require("./edit_data.repository");

function initEditdata(knex) {
  const repository = createEditdataRepository(knex);
  const service = createEditdataService(repository);
  const controller = createEditdataController(service);

  return controller;
}

module.exports = { initEditdata };
