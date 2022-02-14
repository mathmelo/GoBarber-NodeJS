import Notification from '../schema/NotificationSchema';
import User from '../models/User';

/**
 * CONTROLLER RESPONSIBLE FOR LISTING NOTIFICATIONS
 */

class NotificationController {
  // *** Listing Notifications ***
  async index(request, response) {
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

  async update(request, response) {
    const notificationId = request.params.id;

    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return response
        .status(400)
        .json({ message: 'Notification does not exists' });
    }

    if (notification.read === true) {
      return response
        .status(400)
        .json({ message: 'Notification has already been read' });
    }

    if (notification.user !== request.userId) {
      return response.status(404).json({ message: 'Unauthorized operation' });
    }

    await notification.updateOne({ read: true });

    return response.status(200).json({ message: 'Notification updated' });
  }
}

export default new NotificationController();
