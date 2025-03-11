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
