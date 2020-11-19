// Imports
// Node_modules imports
import Sequelize from 'sequelize';

// Import configs
import databaseConfig from '../config/database';

// Import models
import User from '../app/models/Users';

// Models array
const models = [User];

// Models loader class
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
