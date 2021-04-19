import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import mailer from '../../lib/NodeMailer';

// =============================================================================

/**
 * This class will be responsible for managing cancellation e-mails
 */

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    /**
     * This function will send an email for the provider informing about the
     * cancelation of the appointment
     */

    await mailer.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment cancelled',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', ás' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
