// IMPORTS =====================================================================
// Models imports
import User from '../models/User';
import File from '../models/File';

// =============================================================================

/**
 * Controller responsible to show all providers
 */

class ProviderController {
  async show(request, response) {
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

    return response.json(providers);
  }
}
// =============================================================================

export default new ProviderController();
