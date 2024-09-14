import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadsPath = path.join(__dirname, '..', 'static');

        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath, { recursive: true });
        }

        cb(null, uploadsPath); 
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const uniqueFilename = '' + Date.now();  
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage });

export const uploadSingleFile = (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }

        if (!req.file || !req.file.filename) {
            return res.status(400).json({ message: 'File is missing' });
        }

        req.body.filename = req.file.filename;
        next();
    });
};