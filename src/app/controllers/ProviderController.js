import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

/**
 * CONTROLLER RESPONSIBLE FOR LISTING ALL PROVIDERS
 */

class ProviderController {
  // *** Listing Providers ***
  async index(request, response) {
    const cached = await Cache.get('providers');

    if (cached) {
      return response.json(cached);
    }

    const providers = await User.findAll({
      where: {
        provider: true,
      },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    await Cache.set('providers', providers);

    return response.json(providers);
  }
}

export default new ProviderController();
