const dotenv = require('dotenv');

dotenv.config();

// Connection with PostgreSQL Database
module.exports = {
  dialect: 'postgres',
  host: process.env.HOST,
  username: process.env.USERNAME_G,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  define: {
    // Sets the time when creating a user
    timestamps: true,

    // Sequelize renames tables, columns and relationships in the underscored pattern
    underscored: true,
    underscoredAll: true,
  },
};
