function createCategoryRepository(knex, table = "category_mst") {
  const categoryList = async () => {
    const result = await knex.select("*").from("category_mst");
    return result;
  };

  return { categoryList };
}

module.exports = { createCategoryRepository };
