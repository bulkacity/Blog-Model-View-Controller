const bcrypt = require("bcrypt");
const db = require("../models");

// Display user registration form on GET
exports.userRegisterGet = (req, res) => {
  res.render("register");
};

// Handle user registration on POST
exports.userRegisterPost = async (req, res) => {
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
};

// Display user login form on GET
exports.userLoginGet = (req, res) => {
  res.render("login");
};

// Handle user login on POST
exports.userLoginPost = async (req, res) => {
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
};

// Handle user logout on POST
exports.userLogoutPost = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
