function createEditdataController(service) {
  const editdata = async (req, res) => {
    const id = Number(req.params.id);
    const result = await service.editdata(id);
    if (result.ok) {
      res.status(200).json({ result });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  const create = async (req, res) => {
    const result = await service.create(req.body);
    if (result.ok) {
      res.status(201).json({ result });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };
  return { editdata, create };
}
module.exports = { createEditdataController };
