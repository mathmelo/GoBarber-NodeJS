import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

// =============================================================================

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    /**
     * Creating a connection with Postgres Database by Sequelize.
     */

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

  /**
   * Create a connection with the Mongo Database.
   */

  mongo() {
    try {
      this.mongoConnection = mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
      throw new Error('> Mongo cannot connect');
    }
  }
}

export default new Database();
