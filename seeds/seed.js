const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    post.user_id = users[randomUserIndex].id;
  }

  await Post.bulkCreate(postData);

  process.exit(0);
};

seedDatabase();
