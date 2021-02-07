// IMPORTS
import Sequelize, { Model } from 'sequelize';

// File creation model
class File extends Model {
  // Variable 'sequelize' is a data connection from database file
  static init(sequelize) {
    // Two parameters: File data and connection data
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

// Exporting only reference of class
export default File;
