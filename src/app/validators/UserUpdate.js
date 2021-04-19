import * as Yup from 'yup';

import '../util/YupCustomMessages';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      password: Yup.string().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (err) {
    const errors = err.inner.map((error) => {
      return error.message;
    });

    return response.status(400).json({ message: 'Validation failed', errors });
  }
};
