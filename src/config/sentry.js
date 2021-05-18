export default {
  dsn: process.env.SENTRY_DSN,
  debug: false,
  logLevel: 'None',
  release: process.env.NODE_ENV,
};
