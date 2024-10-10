const { DataTypes } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("posts", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow nulls for existing users
      references: {
        model: "users", // Reference to users table
        key: "id",
      },
      onDelete: "SET NULL", // Change to SET NULL if user is deleted
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("posts");
}

module.exports = { up, down };
