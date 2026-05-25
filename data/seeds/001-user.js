/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_table").del();
  await knex("user_table").insert([
    { user_name: "aaaa" },
    { user_name: "bbbb" },
    { user_name: "cccc" },
  ]);
};
