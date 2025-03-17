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
  price: z.number().int().positive().default(0),
  quantity: z.number().int().positive().default(0),
  category: z.nativeEnum(ProductCategories),
  subCategory: z.nativeEnum(SubProductCategories),
  images: z
    .array(z.string())
    .min(3, "You must at least have 3 images")
    .max(10, "Can't add more than 10 images")
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
