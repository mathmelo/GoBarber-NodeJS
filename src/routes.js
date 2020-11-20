// Imports
// Node_modules imports
import { Router } from 'express';

// Import Controllers
import UserController from './app/controllers/UserController';

// Creating Router Instance
const routes = new Router();

// Routes
routes.post('/users', UserController.store);

// Export routes
export default routes;
