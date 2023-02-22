const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const router = express.Router();

// Display registration form on GET
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle user registration on POST
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    req.session.userId = user.id;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
});

// Display login form on GET
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle user login on POST
router.post("/login", async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      res.status(401).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).send("Invalid email or password");
    }
    req.session.userId = user.id;
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in user");
  }
});

// Handle user logout on POST
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
