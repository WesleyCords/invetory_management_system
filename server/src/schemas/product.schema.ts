import z from 'zod';

export const createProductSchema = z.object({
  sku: z.string().min(3, 'SKU is required').toUpperCase(),
  name: z
    .string()
    .max(100, 'The product name must be no longer than 100 characters'),
  price: z.number().positive('A price cannot be negative'),
  description: z.string().optional(),
  categoryId: z.uuid('Invalid categoryId format').optional(),
  brandId: z.uuid('Invalid brandId format').optional(),
  brandName: z.string().optional(),
  categoryName: z.string().optional(),
  supplierIds: z
    .array(z.uuid('Invalid supplierId format'))
    .min(1, 'The product requires at least one supplier')
    .refine(
      (ids) => new Set(ids).size === ids.length,
      'Duplicate suppliers are not allowed',
    ),
  costPrice: z.number().positive('A cost price cannot be negative'),
});

export const productResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.uuid(),
    sku: z.string(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string().nullable(),
    isActive: z.boolean(),
    categoryId: z.uuid(),
    brandId: z.uuid(),
    suppliers: z.array(
      z.object({
        id: z.uuid(),
        productId: z.uuid(),
        supplierId: z.uuid(),
      }),
    ),
    costPrice: z.number().positive(),
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
      id: z.uuid(),
      sku: z.string(),
      name: z.string(),
      price: z.number().positive(),
      description: z.string().nullable(),
      isActive: z.boolean(),
      categoryId: z.uuid(),
      brandId: z.uuid(),
      brand: z.object({
        name: z.string(),
      }),
      category: z.object({
        id: z.uuid(),
        name: z.string(),
      }),
      suppliers: z.array(
        z.object({
          id: z.uuid(),
          name: z.string(),
          company: z.string(),
          address: z.string(),
        }),
      ),
      quantity: z.number(),
      isLowStock: z.boolean(),
    }),
  ),
});
