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
import AvailableController from './app/controllers/AvailableController';

// Input Validators
import UserStore from './app/validators/UserStore';
import UserUpdate from './app/validators/UserUpdate';
import SessionStore from './app/validators/SessionStore';
import AppointmentStore from './app/validators/AppointmentStore';

// Middlewares.
import Auth from './app/middlewares/auth';

// Configs.
import multerConfig from './config/multer';

// =============================================================================

const routes = new Router();
const upload = multer(multerConfig);

// ROUTES ======================================================================

// *** Session ***
routes.post('/sessions', SessionStore, SessionController.store);

// *** User ***
routes.post('/users', UserStore, UserController.store);
routes.put('/users', Auth, UserUpdate, UserController.update);

// *** Provider ***
routes.get('/providers', Auth, ProviderController.index);
routes.get('/providers/:providerId/available', Auth, AvailableController.index);

// *** Provider Schedule ***
routes.get('/schedule', Auth, ScheduleController.index);

// *** Appointment ***
routes.post(
  '/appointments',
  Auth,
  AppointmentStore,
  AppointmentController.store
);
routes.get('/appointments', Auth, AppointmentController.index);
routes.delete('/appointments/:id', Auth, AppointmentController.destroy);

// *** Notification ***
routes.get('/notifications', Auth, NotificationController.index);
routes.put('/notifications/:id', Auth, NotificationController.update);

// *** Upload ***
routes.post('/files', Auth, upload.single('file'), FileController.store);

export default routes;
