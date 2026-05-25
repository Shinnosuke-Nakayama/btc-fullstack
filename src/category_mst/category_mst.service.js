function createCategoryService(repository) {
  const categoryList = async () => {
    return await repository.categoryList();
  };

  return { categoryList };
}

module.exports = { createCategoryService };
