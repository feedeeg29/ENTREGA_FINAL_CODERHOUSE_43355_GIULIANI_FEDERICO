import path from 'path';
import multer from 'multer'
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'document') {
            cb(null, path.join(__dirname, '../uploads/documents'));
        } else {
            cb(new Error('Tipo de archivo no admitido'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({ storage: storage });
