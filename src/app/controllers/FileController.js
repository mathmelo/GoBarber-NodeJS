// IMPORTS
import File from '../models/File';

/**
 * Controller responsible to create a file data and upload it to storage
 */

class FileController {
  async store(request, response) {
    // Request.file is an object created from the multer to place properties
    const { originalname: name, filename: path } = request.file;

    // Creating file row in the database
    const file = await File.create({
      name,
      path,
    });

    // Return file properties
    return response.json(file);
  }
}

export default new FileController();
