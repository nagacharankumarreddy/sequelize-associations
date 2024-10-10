const { DataTypes } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("users");
}

module.exports = { up, down };
