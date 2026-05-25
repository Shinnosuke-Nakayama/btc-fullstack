function createCategoryController(service) {
  const categoryList = async (req, res) => {
    const result = await service.categoryList();
    res.status(200).json({ data: result });
  };

  return { categoryList };
}
module.exports = { createCategoryController };
