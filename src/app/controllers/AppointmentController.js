import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';
import Notification from '../schema/NotificationSchema';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

// =============================================================================

/**
 * CONTROLLER RESPONSIBLE TO LISTING, CREATE AND CANCEL APPOINTMENTS.
 * OBS:
 *  --> Send e-mails to providers and notify them (only in delete method).
 */

class AppointmentController {
  // *** Listing Appointments ***
  async index(request, response) {
    const { page = 1 } = request.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: request.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return response.json(appointments);
  }

  // *** Create Appointments ***
  async store(request, response) {
    const { provider_id, date } = request.body;

    /**
     * Checking if a provider_id belongs to a provider
     */

    const isProvider = await User.findOne({
      where: {
        id: provider_id,
        provider: true,
      },
    });

    if (!isProvider) {
      return response
        .status(401)
        .json({ error: 'You can only create an appointment with providers' });
    }

    /**
     * Checking if the user is creating a appointment with himself
     */

    if (provider_id === request.userId)
      return response
        .status(400)
        .json({ error: 'You can not create appointments with yourself' });

    /**
     * Making treatment with dates. Here, two restrictions are added.
     * First: Client cannot create  an appointment before actual date
     * Second: Client cannot create an appointment with same date as the other
     */

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response
        .status(400)
        .json({ error: 'Past dates are not permitted' });
    }

    const checkAvailabiaty = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailabiaty) {
      return response
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointments = await Appointment.create({
      user_id: request.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */

    const user = await User.findByPk(request.userId);

    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para o ${formattedDate}`,
      user: provider_id,
    });

    return response.json(appointments);
  }

  // *** Delete Appointments ***
  async destroy(request, response) {
    const appointment = await Appointment.findByPk(request.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (!appointment)
      return response.status(400).json({ error: 'Appointment not found' });

    if (appointment.user_id !== request.userId) {
      return response.status(401).json({
        error: 'You don´t have permission to cancel this appointment',
      });
    }

    /**
     * User can only cancel the appointment 2 hours before the date
     * The conditional will check this
     */

    const date = subHours(appointment.date, 2);

    if (isBefore(date, new Date())) {
      return response.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    /**
     * This function will add a cancellation e-mail to queue
     */

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();
