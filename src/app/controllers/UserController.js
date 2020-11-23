// Imports
import User from '../models/Users';

class UserController {
  // User creation controller
  async store(request, response) {
    // Checking if the user already exists
    const userExists = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    // User creation
    const { name, email, provider, id } = await User.create(request.body);

    // Return data to client
    return response.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(request, response) {
    return response.json({ message: 'ok' });
  }
}

export default new UserController();
