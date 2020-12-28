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

    // Turns password into a hash
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  // Associates file IDs with the avatar_id column
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  // Check if the password is correct
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

// Exporting only reference of class
export default User;
