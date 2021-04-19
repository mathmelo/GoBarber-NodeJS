import File from '../models/File';

/**
 * CONTROLLER RESPONSIBLE FOR CREATING A DATA FILE AND UPLOADING IT FOR STORAGE
 */

class FileController {
  // *** Create File ***
  async store(request, response) {
    const { originalname: name, filename: path } = request.file;

    const file = await File.create({
      name,
      path,
    });

    return response.json(file);
  }
}

export default new FileController();
