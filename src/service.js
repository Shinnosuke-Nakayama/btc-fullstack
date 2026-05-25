function createService(repository) {
  const categoryList = async (req, res) => {
    return await repository.categoryList();
  };
  return { categoryList };
}

module.exports = { createService };
