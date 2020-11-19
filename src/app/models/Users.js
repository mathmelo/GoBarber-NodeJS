// Imports
import Sequelize, { Model } from 'sequelize';

// User creation model
class User extends Model {
  // Variable 'sequelize' is a data connection from database file
  static init(sequelize) {
    // Two parameters: User data and connection data
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

// Exporting only reference of class
export default User;
