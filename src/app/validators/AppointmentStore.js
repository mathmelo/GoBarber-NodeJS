import * as Yup from 'yup';

import '../util/YupCustomMessages';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
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
