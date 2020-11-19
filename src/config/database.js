// Connection with PostgreSQL Database
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    // Sets the time when creating a user
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
