// Imports
// Node_modules imports
import jwt from 'jsonwebtoken';

// User model import
import User from '../models/Users';

// Auth config
import authConfig from '../../config/auth';

// User Login controller
class Session {
  // Creating a session method
  async store(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });

    // Checking email existance
    if (!user)
      return response.status(401).json({ error: 'User does not exist' });

    // Checking password match
    if (!(await user.checkPassword(password)))
      return response.status(401).json({ message: 'Password does not match' });

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      // Creating login token
      token: jwt.sign({ id }, authConfig.youDidNotSeeAnything, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new Session();
