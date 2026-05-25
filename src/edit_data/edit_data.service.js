function createEditdataService(repository) {
  const editdata = async (id) => {
    const data = await repository.editdata(id);
    if (!data) return { ok: false, status: 404, message: "id not found" };
    return { ok: true, data };
  };

  const create = async (payload) => {
    const created = await repository.create(payload);
    return { ok: true, created };
  };
  return { editdata, create };
}

module.exports = { createEditdataService };
