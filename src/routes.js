// Imports
// Node_modules imports
import { Router } from 'express';

// Import Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Import Middlewares
import Auth from './app/middlewares/auth';

// Creating Router Instance
const routes = new Router();

// Routes
// User Routes
routes.post('/users', UserController.store);
routes.put('/users', Auth, UserController.update);

// Session Routes
routes.post('/session', SessionController.store);

// Exporting routes
export default routes;
