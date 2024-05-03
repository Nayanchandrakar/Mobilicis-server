import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "minimum 4 characters required",
  }),
  email: z.string().email(),
  password: z.string().min(3, {
    message: "minimum 3 characters required",
  }),
});

export type registerSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, {
    message: "minimum 3 characters required",
  }),
  code: z.optional(z.string()),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
