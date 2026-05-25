/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("category_mst").del();
  await knex("category_mst").insert([
    { category_name: "カテゴリー1" },
    { category_name: "カテゴリー2" },
    { category_name: "カテゴリー3" },
    { category_name: "カテゴリー4" },
    { category_name: "カテゴリー5" },
  ]);
};
