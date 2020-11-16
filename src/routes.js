// Imports
import { Router } from 'express';

// Creating Router instance
const routes = new Router();

// Routes
routes.get('/', (request, response) =>
  response.json({ message: 'Hello World!' })
);

export default routes;
