// Imports
import { Router } from 'express';
import User from './app/models/Users';

// Creating Router instance
const routes = new Router();

// Routes
routes.get('/', async (request, response) => {
  const user = await User.create({
    name: 'Matheus Melo',
    email: 'test@gmail.com',
    password_hash: '123456',
  });

  response.json(user);
});

export default routes;
