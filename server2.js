const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const homeRoutes = require("./routes/homeRoutes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files in public directory
app.use(express.static("public"));

// Define routes
app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/", homeRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
