module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Post, { foreignKey: "userId", as: "posts" });
  };

  return User;
};
