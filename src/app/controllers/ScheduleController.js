// Imports
// Node_modules imports
import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

// Models imports
import Appointment from '../models/Appointment';
import User from '../models/User';

class Schedule {
  async show(request, response) {
    const checkIsProvider = await User.findOne({
      where: {
        id: request.userId,
        provider: true,
      },
    });

    if (!checkIsProvider)
      return response.status(401).json({ error: 'User is not a provider' });

    const { date } = request.query;

    if (!date)
      return response.status(400).json({ error: 'Date was not informed' });

    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: request.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    return response.json(appointments);
  }
}

export default new Schedule();
