import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

// Налаштовуємо Multer для зберігання файлів у папці 'uploads' у кореневій папці проєкту
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadsPath = path.join(__dirname, '..', 'static');  // Вказуємо шлях до кореневої папки

        // Перевіряємо, чи існує папка, якщо ні — створюємо її
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath, { recursive: true });
        }

        cb(null, uploadsPath);  // Використовуємо шлях до папки uploads
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, Date.now() + '-' + file.originalname);  // Створюємо унікальне ім'я для файлу
    }
});

const upload = multer({ storage });

// Middleware для завантаження одного файлу
export const uploadSingleFile = (req: Request, res: Response, next: NextFunction) => {
    upload.single('file')(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }
        next();
    });
};