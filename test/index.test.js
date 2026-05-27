const chai = require("chai");
const chaiHttp = require("chai-http");
const { buildApp } = require("../app");

const app = buildApp();
const expect = chai.expect;
chai.use(chaiHttp);

describe("GET /categorys", () => {
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it("should return status 200", async () => {
    const response = await request.get("/categorys/");
    expect(response).to.have.status(200);
  });

  it("should return カテゴリーの配列を返す", async () => {
    const response = await request.get("/categorys/");
    expect(response.body.data).to.deep.equal([
      { category_id: 1, category_name: "カテゴリー1" },
      { category_id: 2, category_name: "カテゴリー2" },
      { category_id: 3, category_name: "カテゴリー3" },
      { category_id: 4, category_name: "カテゴリー4" },
      { category_id: 5, category_name: "カテゴリー5" },
    ]);
  });
});
describe("GET /editdata/:id", () => {
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it("should return status 200", async () => {
    const response = await request.get("/editdata/1");
    expect(response).to.have.status(200);
  });

  it("should return status 404", async () => {
    const response = await request.get("/editdata/50");
    expect(response).to.have.status(404);
  });
  it("should return category_idと合致する値を持つ分だけの要素を持つ配列を返す", async () => {
    const response = await request.get("/editdata/2");
    const idList = response.body.result.data.map((ele) => ele.category_id);
    expect(idList.every((e) => e === 2)).to.equal(true);
    expect(response.body.result.data.length).to.equal(3);
  });
});
describe("POST /editdata", () => {
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it("should return status 201", async () => {
    const response = await request.post("/editdata").send({
      category_id: 4,
      user_id: 1,
      create_date_at: new Date(),
      edit_date_at: new Date(),
      contents_status: "Good",
      contents_path: "14217651-hd_1920_1080_30fps.mp4",
      comment: "いい感じに咲いてきています",
      focus_point_x: 234,
      focus_point_y: 120,
      focus_start_time: 1,
      focus_end_time: 4,
    });
    expect(response).to.have.status(201);
  });

  it("should return status 情報が登録ができている", async () => {
    const response = await request.post("/editdata").send({
      category_id: 4,
      user_id: 1,
      create_date_at: new Date(),
      edit_date_at: new Date(),
      contents_status: "Good",
      contents_path: "14217651-hd_1920_1080_30fps.mp4",
      comment: "TRY",
      focus_point_x: 234,
      focus_point_y: 120,
      focus_start_time: 10,
      focus_end_time: 4,
    });
    const res = await request.get("/editdata/4");
    const data = res.body.result.data.find((ele) => ele.edit_id === 27);
    expect(data.edit_id).to.deep.equal(27);
  });
});
