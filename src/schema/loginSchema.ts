import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "email wajib diisi")
    .email("format email tidak valid")
    .lowercase(),

  password: z.string().min(1, "password wajib diisi"),
});

export type LoginInput = z.infer<typeof loginSchema>;
