import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
