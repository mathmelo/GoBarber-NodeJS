// Imports
import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

// User creation model
class User extends Model {
  // Variable 'sequelize' is a data connection from database file
  static init(sequelize) {
    // Two parameters: User data and connection data
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

// Exporting only reference of class
export default User;
