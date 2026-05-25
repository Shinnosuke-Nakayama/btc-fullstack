require("dotenv").config();

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL || {
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    directory: "./data/migrations",
  },
  seeds: { directory: "./data/seeds" },
};
