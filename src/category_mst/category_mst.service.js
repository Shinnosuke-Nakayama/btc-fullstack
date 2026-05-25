function createCategoryService(repository) {
  const categoryList = async () => {
    return await repository.categoryList();
  };

  const editdata = async (id) => {
    return await repository.editdata(id);
  };
  return { categoryList, editdata };
}

module.exports = { createCategoryService };
