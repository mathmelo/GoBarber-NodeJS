// Connection with PostgreSQL Database
console.log(`>${process.env.HOST}`);
console.log(`>${process.env.USERNAME_G}`);
console.log(`>${process.env.PASSWORD}`);
console.log(`>${process.env.DATABASE}`);
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
