"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadsPath = path_1.default.join(__dirname, '..', 'static');
        if (!fs_1.default.existsSync(uploadsPath)) {
            fs_1.default.mkdirSync(uploadsPath, { recursive: true });
        }
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = '' + Date.now();
        cb(null, uniqueFilename);
    }
});
const upload = (0, multer_1.default)({ storage });
const uploadSingleFile = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({ message: 'Multer error', error: err.message });
        }
        else if (err) {
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }
        if (!req.file || !req.file.filename) {
            return res.status(400).json({ message: 'File is missing' });
        }
        req.body.filename = req.file.filename;
        next();
    });
};
exports.uploadSingleFile = uploadSingleFile;
