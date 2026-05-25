function createEditdataRepository(knex, table = "edit_data") {
  const editdata = async (id) => {
    const result = await knex(table).where("edit_id", id);
    return result[0];
  };

  const create = async (payload) => {
    const data = await knex(table).insert([payload], ["*"]);
    return data[0];
  };
  return { editdata, create };
}

module.exports = { createEditdataRepository };
