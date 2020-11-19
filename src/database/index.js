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
    // Creating connection with database
    this.connection = new Sequelize(databaseConfig);

    // Mapping models to apply connection to them
    models.map((model) => model.init(this.connection));
  }
}

// Export new database to app
export default new Database();
