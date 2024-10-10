const sequelize = require("./config/database");
const db = require("./src/db/models");

const addStaticData = async () => {
  try {
    const user1 = await db.User.findOne({
      where: { email: "john@example.com" },
    });
    if (!user1) {
      await db.User.create({
        name: "JohnaDoe",
        email: "johna@example.com",
      });
    }

    const user2 = await db.User.findOne({
      where: { email: "jane@example.com" },
    });
    if (!user2) {
      await db.User.create({
        name: "JaneDoe",
        email: "jane@example.com",
      });
    }

    // const post1 = await db.Post.findOne({ where: { title: "First Post" } });
    // if (!post1) {
    //   const createdPost1 = await db.Post.create({
    //     title: "First Post",
    //     content: "This is my first post.",
    //     UserId: user1.id, // Use existing user ID
    //   });
    //   await db.Comment.create({
    //     content: "Great post!",
    //     PostId: createdPost1.id,
    //   });
    // }

    // const post2 = await db.Post.findOne({ where: { title: "Second Post" } });
    // if (!post2) {
    //   const createdPost2 = await db.Post.create({
    //     title: "Second Post",
    //     content: "This is my second post.",
    //     UserId: user2.id, // Use existing user ID
    //   });
    //   await db.Comment.create({
    //     content: "Thanks for sharing!",
    //     PostId: createdPost2.id,
    //   });
    // }

    console.log("Static data added successfully.");
  } catch (error) {
    console.error("Error adding static data:", error);
  }
};

addStaticData();
