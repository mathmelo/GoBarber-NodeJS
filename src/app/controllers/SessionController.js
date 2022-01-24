import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

/**
 * CONTROLLER RESPONSIBLE FOR CREATING A SESSION WITH JWT AUTHENTICATION
 */

class Session {
  // *** Create Session ***
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['path', 'url', 'id'] },
      ],
    });

    /**
     * Checking email existance
     */

    if (!user)
      return response.status(401).json({ error: 'User does not exist' });

    /**
     * Checking password match
     */

    if (!(await user.checkPassword(password)))
      return response.status(401).json({ message: 'Password does not match' });

    const { id, name, avatar } = user;

    return response.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      // Creating login token
      token: jwt.sign({ id }, authConfig.youDidNotSeeAnything, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new Session();
