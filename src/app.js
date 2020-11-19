// Imports
import express from 'express';

import routes from './routes';
import './database';

// Creating class 'App' to start application
class App {
  constructor() {
    // Create server
    this.server = express();

    // Calling middleware and routes to server
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Give express the ability to understand JSON format
    this.server.use(express.json());
  }

  routes() {
    // Import routes into the application
    this.server.use(routes);
  }
}

// Export application
export default new App().server;
