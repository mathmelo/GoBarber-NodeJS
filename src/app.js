import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import SentryConfig from './config/sentry';

import 'express-async-errors';

import routes from './routes';

import './database';

// =============================================================================

/**
 * This class will be responsible for general application settings, including
 * global middlewares, routes and database calls.
 *
 * OBS:
 *  --> Sentry is an exception receptor
 *  --> Youch is a pretty error reporter
 */

class App {
  constructor() {
    this.server = express();

    Sentry.init(SentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, request, response, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, request).toJSON();

        return response.status(500).json(errors);
      }

      return response.status(500).json({ message: 'Internal server error' });
    });
  }
}

export default new App().server;
