import z from 'zod';

export const BrandListResponse = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export const CreateBrandRequest = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
});

export const ResponseBrand = z.object({
  message: z.string(),
  data: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
