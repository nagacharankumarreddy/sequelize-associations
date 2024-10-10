module.exports = (sequelize, DataTypes) => {
  class Comment extends sequelize.Sequelize.Model {}

  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
  };

  return Comment;
};
