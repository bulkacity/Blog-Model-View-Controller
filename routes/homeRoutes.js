const express = require("express");
const db = require("../models");
const router = express.Router();

// Display home page
router.get("/", async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [{ model: db.User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    res.render("home", { posts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving posts");
  }
});

module.exports = router;
