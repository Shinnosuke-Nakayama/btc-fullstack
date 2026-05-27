function createEditdataRepository(knex, table = "edit_data") {
  const editdata = async (id) => {
    const result = await knex(table).where("category_id", id);

    return result.length <= 0 ? false : result;
  };

  const create = async (payload) => {
    const data = await knex(table).insert([payload], ["*"]);
    return data[0];
  };
  return { editdata, create };
}

module.exports = { createEditdataRepository };
