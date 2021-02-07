// IMPORTS =====================================================================
// Models and Schema imports
import Notification from '../schema/NotificationSchema';
import User from '../models/User';

// =============================================================================

/**
 * Controller responsible for listing notifications to the provider
 */

class NotificationController {
  async show(request, response) {
    // Checking if user is a provider
    const checkIsProvider = await User.findOne({
      where: {
        id: request.userId,
        provider: true,
      },
    });

    if (!checkIsProvider)
      return response
        .status(401)
        .json({ error: 'Only provider can load notifications' });

    const notifications = await Notification.find({
      user: request.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return response.json(notifications);
  }
}
// =============================================================================

export default new NotificationController();
