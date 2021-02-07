// IMPORTS =====================================================================
// Node_modules imports.
import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Import configs.
import databaseConfig from '../config/database';

// Import models.
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// PREVIOUS CONFIGURATION ======================================================
// Models array.
const models = [User, File, Appointment];

// =============================================================================
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    // Creating a connection with Postgres Database by Sequelize.
    this.connection = new Sequelize(databaseConfig);

    /**
     * First mapping: Mapping the models to apply connection to them.
     * Second mapping: Mapping the models to reference user to your avatar´s id.
     */
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  // Create a connection with the Mongo Database.
  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

// =============================================================================
// Export new database to app.
export default new Database();
