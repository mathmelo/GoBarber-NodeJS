// Imports
import File from '../models/File';

class FileController {
  // FILE CREATION CONTROLLER
  async store(request, response) {
    // Request.file is an object created from the multer to place properties
    const { originalname: name, filename: path } = request.file;

    // Creating file table
    const file = await File.create({
      name,
      path,
    });

    // Return file properties
    return response.json(file);
  }
}

export default new FileController();
