const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const basename = path.basename(__filename);
const db = {};

// Read all files in the db directory except index.js
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // Import the model
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    // Add the model to the models object
    db[model.name] = model;
  });

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export sequelize and models object
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
