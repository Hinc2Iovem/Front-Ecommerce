import { z } from "zod";

export const userSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, { message: "Your name should be at least 4 characters long" }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, {
        message:
          "Should consist of at least 8 characters long but not more than 24, include at least one uppercase letter, special character and number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type userSchemaTypes = z.infer<typeof userSchema>;
