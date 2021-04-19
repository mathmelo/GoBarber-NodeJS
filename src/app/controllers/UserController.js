import User from '../models/User';

import Cache from '../../lib/Cache';

/**
 *  CONTROLLER RESPONSIBLE FOR CREATING AND UPDATING USERS
 */

class UserController {
  // *** Create User***
  async store(request, response) {
    /**
     * Checking if the user already exists
     */

    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const { provider: providerCache } = request.body;

    if (providerCache) {
      await Cache.invalidate('providers');
    }

    const { name, email, provider, id } = await User.create(request.body);

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }

  // *** Update User***
  async update(request, response) {
    const { email, oldPassword } = request.body;

    const user = await User.findByPk(request.userId);

    /**
     * Checking if the typed email is different from the user's email
     */

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return response.status(400).json({ error: 'User already exists' });
    }

    /**
     * Checking if the typed old password is different from the user's password
     */

    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return response.status(401).json({ error: 'Password does not match' });

    /**
     * If client sends provider manually, it will be converted to false
     */

    if (request.body.provider) request.body.provider = false;

    const { name, provider, id } = await user.update(request.body);

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
