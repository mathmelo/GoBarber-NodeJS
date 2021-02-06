/**
 * Configuration of email service
 * For dev: Mailtrap
 * For prod: Amazon SAS
 */

export default {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  default: {
    from: process.env.EMAIL_FROM,
  },
};
