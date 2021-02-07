// IMPORTS =====================================================================
// Node_modules imports.
import { Router } from 'express';
import multer from 'multer';

// Import Controllers.
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

// Import Middlewares.
import Auth from './app/middlewares/auth';

// Import Configs.
import multerConfig from './config/multer';

// PREVIOUS CONFIGURATION ======================================================
// Creating Router Instance.
const routes = new Router();

// Creating Multer Middleware to file saving.
const upload = multer(multerConfig);

// ROUTES ======================================================================
// User Routes.
routes.post('/users', UserController.store);
routes.put('/users', Auth, UserController.update);

// Provider Routes.
routes.get('/providers', Auth, ProviderController.show);

// Session Routes.
routes.post('/sessions', SessionController.store);

// Appointment Routes.
routes.post('/appointments', Auth, AppointmentController.store);
routes.get('/appointments', Auth, AppointmentController.show);
routes.delete('/appointments/:id', Auth, AppointmentController.delete);

// Notification Routes.
routes.get('/notifications', Auth, NotificationController.show);

// Schedule Routes.
routes.get('/schedule', Auth, ScheduleController.show);

// Upload Routes.
routes.post('/files', Auth, upload.single('file'), FileController.store);

// Exporting routes.
export default routes;
