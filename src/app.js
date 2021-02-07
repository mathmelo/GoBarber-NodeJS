// IMPORTS =====================================================================
// Node_modules imports.
import express from 'express';
import path from 'path';

// Import routes.
import routes from './routes';

// Import model loader.
import './database';

// =============================================================================
class App {
  constructor() {
    // Create server.
    this.server = express();

    // Calling middleware and routes to server.
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Give server the ability to understand JSON format.
    this.server.use(express.json());
    // Give server the ability to show static files.
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp'))
    );
  }

  routes() {
    // Import routes into the application.
    this.server.use(routes);
  }
}

// =============================================================================
// Export "server" of the application.
export default new App().server;
