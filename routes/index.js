const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("../models");
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const app = express();

const PORT = process.env.PORT || 3000;

// Set up session middleware
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false },
  })
);

// Set up view engine and static directory
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Set up request body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up middleware to add current user to request object
app.use(async (req, res, next) => {
  if (req.session.userId) {
    const user = await db.User.findByPk(req.session.userId);
    res.locals.currentUser = user;
  } else {
    res.locals.currentUser = null;
  }
  next();
});

// Set up routes
app.use("/", homeRoutes);
app.use("/users", userRoutes);
app.use("/", postRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
