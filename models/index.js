const Sequelize = require("sequelize");
const dbConfig = require("../config/config.json")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Post, { foreignKey: { allowNull: false } });
db.Post.belongsTo(db.User, { foreignKey: { allowNull: false } });

module.exports = db;
