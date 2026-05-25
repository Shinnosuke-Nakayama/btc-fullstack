const { createController } = require("./controller");
const { createService } = require("./service");
const { createRepository } = require("./repository");

function initBackEnd(knex) {
  const repository = createRepository(knex);
  const service = createService(repository);
  const controller = createController(service);

  return controller;
}

module.exports = { initBackEnd };
