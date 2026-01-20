import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "nama wajib diisi")
    .regex(/^[a-zA-Z\s]+$/, "nama hanya boleh huruf dan spasi"),

  email: z
    .string()
    .min(1, "email wajib diisi")
    .email("format email tidak valid")
    .lowercase(),

  password: z
    .string()
    .min(6, "password minimal 6 karakter")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "password harus mengandung huruf dan angka"
    ),

  role: z.enum(["Admin", "User"]).default("User"),

  notelp: z
    .string()
    .regex(/^[0-9]+$/, "nomor telepon hanya boleh angka")
    .optional()
    .default(""),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
