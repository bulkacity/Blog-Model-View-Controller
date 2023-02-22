const db = require("../models");

// Display list of all posts
exports.postList = async (req, res) => {
  try {
    const posts = await db.Post.findAll({ include: [db.User] });
    res.render("home", { posts });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving posts");
  }
};

// Display detail page for a specific post
exports.postDetail = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id, {
      include: [{ model: db.User, attributes: ["username"] }],
    });
    if (!post) {
      res.status(404).send("Post not found");
    }
    res.render("post", { post });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving post");
  }
};

// Display post create form on GET
exports.postCreateGet = (req, res) => {
  res.render("create-post");
};

// Handle post create on POST
exports.postCreatePost = async (req, res) => {
  try {
    const post = await db.Post.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.session.userId,
    });
    res.redirect(`/post/${post.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating post");
  }
};

// Display post update form on GET
exports.postUpdateGet = async (req, res) => {
  try {
    const post = await db.Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).send("Post not found");
    }
    res.render("update-post", { post });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving post");
  }
};

// Handle post update on POST
exports.postUpdatePost = async (req, res) => {
  try {
    const [numRows, [post]] = await db.Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: { id: req.params.id, UserId: req.session.userId },
        returning: true,
      }
    );
    if (numRows === 0) {
      res.status(403).send("Unauthorized");
    }
    res.redirect(`/post/${post.id}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating post");
  }
};

// Handle post delete on POST
exports.postDeletePost = async (req, res) => {
  try {
    const numRows = await db.Post.destroy({
      where: { id: req.params.id, UserId: req.session.userId },
    });
    if (numRows === 0) {
      res.status(403).send("Unauthorized");
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting post");
  }
};
