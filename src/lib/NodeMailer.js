import nodemailer from 'nodemailer';
import mailerConfig from '../config/mail';

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

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailerConfig.default,
      ...message,
    });
  }
}

export default new Mail();
