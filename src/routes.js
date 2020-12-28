// Imports
// Node_modules imports
import { Router } from 'express';
import multer from 'multer';

// Import Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

// Import Middlewares
import Auth from './app/middlewares/auth';

// Import Configs
import multerConfig from './config/multer';

// Creating Router Instance
const routes = new Router();

// Creating Multer Middleware to file saving
const upload = multer(multerConfig);

// Routes
// User Routes
routes.post('/users', UserController.store);
routes.put('/users', Auth, UserController.update);

// Session Routes
routes.post('/session', SessionController.store);

// Upload Routes
routes.post('/files', Auth, upload.single('file'), FileController.store);

// Exporting routes
export default routes;
