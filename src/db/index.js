const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");
const sequelize = require("../config/database.js");

const umzug = new Umzug({
  migrations: { glob: ["src/db/migrations/*.js", {}] },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

const runMigrations = async () => {
  try {
    await umzug.up(); // Run migrations
    console.log("Migrations run successfully");
  } catch (error) {
    console.error("Error running migrations:", error);
  }
};

module.exports = {
  sequelize,
  syncDatabase,
  runMigrations,
};
