import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

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

    this.configureTemplates();
  }

  /**
   * This function make the transporter to understand email templates and
   * configure paths for the layouts
   */

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
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
