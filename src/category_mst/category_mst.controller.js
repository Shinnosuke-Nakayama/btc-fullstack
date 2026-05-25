function createCategoryController(service) {
  const categoryList = async (req, res) => {
    const result = await service.categoryList();
    res.status(200).json({ data: result });
  };

  const editdata = async (req, res) => {
    const id = req.params.id;
    const result = await service.editdata(id);
    res.status(200).json({ data: result });
  };
  return { categoryList, editdata };
}
module.exports = { createCategoryController };
