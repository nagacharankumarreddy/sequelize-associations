module.exports = (sequelize, DataTypes) => {
  class Post extends sequelize.Sequelize.Model {}

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Post.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
  };

  return Post;
};
