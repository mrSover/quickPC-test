declare namespace Express {
    export interface Request {
        file?: Express.Multer.File;
        files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]; // Врахування обох варіантів
    }
}