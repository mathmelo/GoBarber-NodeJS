// IMPORTS =====================================================================
// Node_modules imports
import * as Yup from 'yup';

// Models imports
import User from '../models/User';

// =============================================================================

/**
 * Controller responsible to create and update Users
 */

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

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

    const { name, email, provider, id } = await User.create(request.body);

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(request, response) {
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

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    // Receiving user data for the update
    const { email, oldPassword } = request.body;

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

    const { name, provider, id } = await user.update(request.body);

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }
}
// =============================================================================

export default new UserController();
