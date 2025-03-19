import * as dotenv from 'dotenv';

dotenv.config();

export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = parseInt(process.env.DB_PORT!);
export const DB_USER = process.env.DB_USER!;
export const DB_PASS = process.env.DB_PASS!;
export const DB_NAME = process.env.DB_NAME!;
export const DB_TYPE = process.env.DB_TYPE!;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const ADMIN_OTP = process.env.ADMIN_OTP!;

// Paths
export const productImagePath = (imagePath: string) =>
  `/uploads/products/${imagePath}`;
