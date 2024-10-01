class FilesService {
    async createFile(file: Express.Multer.File): Promise<string> {
        if (!file || !file.filename) {
            throw new Error('File data is missing');
        }

        return file.filename;
    }
}

export default new FilesService();