function createCategoryRepository(knex, table = "category_mst") {
  const categoryList = async () => {
    const result = await knex.select("*").from("category_mst");
    return result;
  };

  const editdata = async (id) => {
    const result = await knex(table).where("id", id);
    return result[0];
  };
  return { categoryList, editdata };
}

module.exports = { createCategoryRepository };
