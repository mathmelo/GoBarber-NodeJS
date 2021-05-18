import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

/**
 * Creating a multer configuration to convert file name and destination path
 */

export default {
  // File save function
  storage: multer.diskStorage({
    // File storage
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // File name
    filename: (request, file, cb) => {
      // Converting file name with crypto and extname functions
      crypto.randomBytes(16, (err, response) => {
        if (err) return cb(err);

        return cb(null, response.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
