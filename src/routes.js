import { Router } from 'express';
import multer from 'multer';

// Controllers.
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

// Middlewares.
import Auth from './app/middlewares/auth';

// Configs.
import multerConfig from './config/multer';

// =============================================================================
const routes = new Router();

// Creating Multer Middleware to file saving.
const upload = multer(multerConfig);

// ROUTES ======================================================================

// USER ROUTES *****************************************************************
routes.post('/users', UserController.store);
routes.put('/users', Auth, UserController.update);

// PROVIDER ROUTES *************************************************************
routes.get('/providers', Auth, ProviderController.show);

// SESSION ROUTES **************************************************************
routes.post('/sessions', SessionController.store);

// APPOINTMENT ROUTES **********************************************************
routes.post('/appointments', Auth, AppointmentController.store);
routes.get('/appointments', Auth, AppointmentController.show);
routes.delete('/appointments/:id', Auth, AppointmentController.destroy);

// NOTIFICATION ROUTES *********************************************************
routes.get('/notifications', Auth, NotificationController.show);

// SCHEDULE ROUTES *************************************************************
routes.get('/schedule', Auth, ScheduleController.show);

// UPLOAD ROUTES ***************************************************************
routes.post('/files', Auth, upload.single('file'), FileController.store);

export default routes;
