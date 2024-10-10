const express = require("express");
const sequelize = require("./config/database");
const umzug = require("./src/migrations");
const User = require("./src/models/User");
const Post = require("./src/models/Post");
const Comment = require("./src/models/Comment");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await umzug.up();
    console.log("Migrations run successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.get("/users", async (req, res) => {
  const users = await User.findAll({ include: Post });
  res.json(users);
});

app.get("/posts", async (req, res) => {
  const posts = await Post.findAll({ include: [User, Comment] });
  res.json(posts);
});

app.get("/comments", async (req, res) => {
  const comments = await Comment.findAll({ include: Post });
  res.json(comments);
});

startServer();
