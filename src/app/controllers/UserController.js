// Imports
import * as Yup from 'yup';
import User from '../models/Users';

class UserController {
  // USER CREATION CONTROLLER
  async store(request, response) {
    // Validation of request data using YUP
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    // Returning error if invalid
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

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

  // USER UPDATE CONTROLLER
  async update(request, response) {
    // Validation of request data using YUP
    // Field means about continuing verification of var
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Returning error if invalid
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    // Receiving user data for the update
    const { email, oldPassword } = request.body;

    // Getting user data with jwt id
    const user = await User.findByPk(request.userId);

    // Checking if the typed email is different from the user's email
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists)
        return response.status(400).json({ error: 'User already exists' });
    }

    // Checking if the typed old password is different from the user's password
    if (oldPassword && !(await user.checkPassword(oldPassword)))
      return response.status(401).json({ error: 'Password does not match' });

    // If client sends provider manually, it will be converted to false
    if (request.body.provider) request.body.provider = false;

    // Updating
    const { name, provider, id } = await user.update(request.body);

    // Return data to client
    return response.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
