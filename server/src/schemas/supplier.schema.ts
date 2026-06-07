import z from 'zod';

export const CreateSupplierRequest = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  address: z
    .string()
    .max(200, 'Address must be at most 200 characters')
    .optional(),
  company: z
    .string()
    .min(2, 'Company must be at least 2 characters')
    .max(100, 'Company must be at most 100 characters'),
});

export const ResponseSupplier = z.object({
  message: z.string(),
  data: z.object({
    id: z.string(),
    name: z.string(),
    address: z.string().optional(),
    company: z.string(),
  }),
});

export const ResponseSuppliers = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      address: z.string().optional(),
      company: z.string(),
    }),
  ),
});
