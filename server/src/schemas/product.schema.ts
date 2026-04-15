import z from 'zod';

export const createProductSchema = z.object({
  sku: z.string().min(3, 'SKU is required').toUpperCase(),
  name: z
    .string()
    .max(100, 'The product name must be no longer than 100 characters'),
  price: z.number().positive('A price cannot be negative'),
  description: z.string().optional(),
  categoryId: z.string().uuid('Invalid categoryId format'),
  brandId: z.string().uuid('Invalid brandId format'),
  supplierIds: z
    .array(z.string().uuid('Invalid supplierId format'))
    .min(1, 'The product requires at least one supplier')
    .refine(
      (ids) => new Set(ids).size === ids.length,
      'Duplicate suppliers are not allowed',
    ),
});

export const productResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.string().uuid(),
    sku: z.string(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
    isActive: z.boolean(),
    categoryId: z.string().uuid(),
    brandId: z.string().uuid(),
    suppliers: z.array(
      z.object({
        id: z.string().uuid(),
        productId: z.string().uuid(),
        supplierId: z.string().uuid(),
      }),
    ),
  }),
});

export const deleteProductSchema = z.object({
  id: z.string().uuid('Invalid product ID format'),
});

export const deleteProductResponse = z.object({
  message: z.string(),
  data: z.object({
    id: z.string().uuid(),
    sku: z.string(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string().optional(),
    isActive: z.boolean(),
    categoryId: z.string().uuid(),
    brandId: z.string().uuid(),
  }),
});

export const getAllProductsResponseSchema = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.string().uuid(),
      sku: z.string(),
      name: z.string(),
      price: z.number().positive(),
      description: z.string().optional(),
      isActive: z.boolean(),
      categoryId: z.string().uuid(),
      brandId: z.string().uuid(),
      brand: z.object({
        name: z.string(),
      }),
      category: z.object({
        id: z.string().uuid(),
        name: z.string(),
      }),
      suppliers: z.array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          company: z.string(),
          address: z.string(),
        }),
      ),
    }),
  ),
});
