// IMPORTS =====================================================================
import nodemailer from 'nodemailer';
import mailerConfig from '../config/mail';

// =============================================================================
/**
 * This class will create a nodemailer transporter to send emails.
 */
class Mail {
  constructor() {
    const { host, port, secure, auth } = mailerConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  /**
   * These two same "sendMail" functions are made to load default settings.
   * from the mailerConfig file first.
   */
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailerConfig.default,
      ...message,
    });
  }
}

export default new Mail();
