import { ProductCategories, SubProductCategories } from "@/lib/product-types";
import { z } from "zod";

// Sign up schema
export const signUpSchema = z.object({
  firstName: z.string().min(2).default(""),
  lastName: z.string().min(2).default(""),
  email: z.string().email().default(""),
  password: z.string().min(8).default(""),
  isAdmin: z.boolean().default(false),
});

export const signUpDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isAdmin: false,
};

// Sign in schema
export const signInSchema = z.object({
  firstName: z.string().min(2).default("").optional(),
  lastName: z.string().min(2).default("").optional(),
  email: z.string().email().default(""),
  password: z.string().min(8).default(""),
  isAdmin: z.boolean().default(false),
});

export const signInDefaultValues = {
  email: "",
  password: "",
};

// Adding single product schema
export const addSingleProductSchema = z.object({
  title: z.string().min(2).default(""),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Quantity must be 0 or greater"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .transform((val) => Number(val))
    .refine((val) => val >= 0, "Price must be 0 or greater"),
  category: z.nativeEnum(ProductCategories),
  subCategory: z.nativeEnum(SubProductCategories),
  images: z
    .array(z.string())
    .min(3, "You must at least have 3 images")
    .max(5, "Can't add more than 5 images")
    .default([]),
});

export const addSingleProductDefaultValues = {
  title: "",
  price: 0,
  quantity: 0,
  category: undefined,
  subCategory: undefined,
  images: [],
};
