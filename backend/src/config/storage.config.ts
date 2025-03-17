// src/config/storage.config.ts
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const uploadDir = './uploads/products';

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const productImageStorage = diskStorage({
  destination: uploadDir,
  filename: (req, file, callback) => {
    console.log(`Hello World`);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const imageFileFilter = (req, file, callback) => {
  const validMimeTypes = ['image/jpeg', 'image/png'];
  if (validMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type'), false);
  }
};
