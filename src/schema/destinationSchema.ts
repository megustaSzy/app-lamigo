import { z } from "zod";

export const createDestinationSchema = z.object({
  name: z.string().min(1, "nama wajib diisi"),
  description: z.string().min(1, "deskripsi wajib diisi"),

  price: z.coerce.number().positive("price harus lebih dari 0"),
  categoryId: z.coerce.number().int().positive(),
  regionId: z.coerce.number().int().positive(),

  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional()
});

export const updateDestinationSchema = createDestinationSchema.partial();

export type CreateDestinationDTO = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationDTO = z.infer<typeof updateDestinationSchema>;