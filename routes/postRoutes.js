const express = require("express");
const db = require("../models");
const router = express.Router();

// Display new post form on GET
router.get("/post/new", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login");
  }
  res.render("new-post");
});

// Handle new post creation on POST
router.post("/post", async (req, res) => {
  try {
    const post = await db.Post.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.session.userId,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating post");
  }
});

// Handle post deletion on DELETE
router.delete("/post/:id", async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id);
    if (post.UserId !== req.session.userId) {
      res.status(403).send("You do not have permission to delete this post");
    }
    await post.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting post");
  }
});

module.exports = router;
