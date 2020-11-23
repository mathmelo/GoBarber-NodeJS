import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  // Getting header token
  const auth = request.headers.authorization;

  // Checking if the token exists
  if (!auth) return response.status(401).json({ error: 'Token not provided' });

  // Unstructuring token
  const [scheme, token] = auth.split(' ');

  // Checking if Token was correctly written
  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ error: 'Token malformatted' });

  try {
    // Checking if the token is valid
    const decoded = await promisify(jwt.verify)(
      token,
      authConfig.youDidNotSeeAnything
    );

    request.userId = decoded.id;
    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token is not valid' });
  }
};
