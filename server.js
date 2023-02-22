const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Use MAMP's MySQL server instead of the default
if (process.env.NODE_ENV !== "production") {
  const mysql = require("mysql2/promise");
  (async () => {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
    });
    await connection.query("CREATE DATABASE IF NOT EXISTS blog_db");
    await connection.end();
  })();
}

// Use session middleware with Sequelize store
const sessionMiddleware = session({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db }),
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionMiddleware);

// Serve static files in public directory
app.use(express.static("public"));

// Define routes
app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/", homeRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
