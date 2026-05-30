const express = require("express");
const knex = require("./knex");

const { initCategory } = require("./src/category_mst/index");
const { initEditdata } = require("./src/edit_data/index");
const { s3GetSignedUrl, uploadVideo } = require("./utils/index");
const multer = require("multer");

function buildApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const upload = multer();

  const createCategoryController = initCategory(knex);
  const createEditdataController = initEditdata(knex);
  app.get("/videos/:filename", async (req, res) => {
    const filename = req.params.filename;
    const data = await s3GetSignedUrl(filename);
    res.status(200).send({ data });
  });

  app.post("/videos", upload.any(), async (req, res) => {
    const data = await uploadVideo(req.files, req.body.fileName);
    res.status(200).send(data);
  });

  app.get("/categorys", createCategoryController.categoryList);
  app.get("/editdata/:id", createEditdataController.editdata);

  app.post("/editdata", createEditdataController.create);

  return app;
}

module.exports = { buildApp };
