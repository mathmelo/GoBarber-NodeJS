import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

/**
 * Controller responsible for create a session with JWT autentication
 */

class Session {
  // CREATE
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

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
