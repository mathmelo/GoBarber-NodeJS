const ENV = process.env.NODE_ENV || 'development';

const dbConfig = {
  development: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    define: {
      // Sets the time when creating a user.
      timestamps: true,

      /**
       * Sequelize renames tables, columns and relationships in the
       * underscored pattern.
       */

      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
    url: process.env.DATABASE_URL,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};

// Exporting connection based on 'ENV' value.
module.exports = dbConfig[ENV];
