/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("edit_data", function (table) {
    table.increments("edit_id").primary();
    table
      .integer("category_id")
      .notNullable()
      .references("category_mst.category_id")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .notNullable()
      .references("user_table.user_id")
      .onDelete("CASCADE");
    table.datetime("create_date_at").notNullable();
    table.datetime("edit_date_at");
    table.string("contents_status", 255).notNullable();
    table.string("contents_path").notNullable();
    table.string("comment", 500);
    table.integer("focus_point_x").notNullable();
    table.integer("focus_point_y").notNullable();
    table.integer("focus_start_time").notNullable();
    table.integer("focus_end_time").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("edit_data");
};
