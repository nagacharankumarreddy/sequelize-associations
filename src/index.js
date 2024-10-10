const express = require("express");
const { syncDatabase, runMigrations } = require("./db");
const sequelize = require("./config/database");
const User = require("./db/models/user");
const Post = require("./db/models/post");
const Comment = require("./db/models/comment");
const db = require("./db/models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const waitForDb = async (maxAttempts = 5, delay = 5000) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      await sequelize.authenticate();
      console.log("Database connection established successfully.");
      return;
    } catch (error) {
      attempts++;
      console.error(
        `Attempt ${attempts} to connect to the database failed:`,
        error.message
      );
      if (attempts < maxAttempts) {
        console.log(`Waiting ${delay / 1000} seconds before retrying...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(
          "Max attempts reached. Could not connect to the database."
        );
        throw error;
      }
    }
  }
};

const startServer = async () => {
  try {
    await waitForDb();
    await runMigrations();
    console.log("Migrations run successfully");

    await syncDatabase({ force: true });
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.get("/users", async (req, res) => {
  try {
    const x = await db.User.create({
      name: "JohnDoe",
      email: "john@example.com",
    });
    res.json(x);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await db.Post.findAll({ include: [User, Comment] });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await db.Comment.findAll({ include: Post });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching comments." });
  }
});

app.get("/migrations", async (req, res) => {
  try {
    const migrations = await sequelize.query("SELECT * FROM SequelizeMeta;", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(migrations);
  } catch (error) {
    console.error("Error fetching migrations:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching migrations." });
  }
});

startServer();
