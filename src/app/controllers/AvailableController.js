import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} from 'date-fns';

import Appointment from '../models/Appointment';

// =============================================================================

/**
 * CONTROLLER RESPONSIBLE FOR CHECKING AVAILABLE DATES TO CREATE
 * NEW APPOINTMENTS
 */

class AvailableController {
  // *** Listing Appointments ***
  async index(request, response) {
    const { date } = request.query;

    if (!date) {
      return response.status(400).json({ error: 'Date is not provided' });
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: request.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
    ];

    const available = schedule.map((time) => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointments.find((a) => format(a.date, 'HH:mm') === time),
      };
    });

    return response.json(available);
  }
}

export default new AvailableController();
