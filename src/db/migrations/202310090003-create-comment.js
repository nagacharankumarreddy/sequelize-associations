const { DataTypes } = require("sequelize");

async function up({ context: queryInterface }) {
  await queryInterface.createTable("comments", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts", // Reference to posts table
        key: "id",
      },
      onDelete: "CASCADE", // Delete comments if the post is deleted
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable("comments");
}

module.exports = { up, down };
