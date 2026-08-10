import z from 'zod';

export const createProductSchema = z.object({
  sku: z
    .string()
    .min(8, 'SKU must be at least 8 characters long')
    .max(18, 'SKU must be between 8 and 18 characters')
    .toUpperCase()
    .regex(
      /^[A-Z0-9]+(-[A-Z0-9]+)*$/,
      'SKU must contain only uppercase letters, numbers, and hyphens',
    ),
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
    currentStock: z.number().nonnegative(),
  }),
});

export const deleteProductSchema = z.object({
  id: z.string().uuid('Invalid product ID format'),
});

export const deleteProductResponse = z.object({
  message: z.string(),
  data: z.object({
    id: z.uuid(),
    sku: z.string(),
    name: z.string(),
    price: z.number().positive(),
    description: z.string().nullable().optional(),
    isActive: z.boolean(),
    categoryId: z.uuid(),
    brandId: z.uuid(),
  }),
});

export const getAllProductsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    products: z.array(
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
        costPrice: z.number().positive(),
      }),
    ),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});

export const updateProductParamsSchema = z.object({
  id: z.uuid('ID de produto inválido.'),
});

export const updateProductBodySchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  description: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  categoryId: z.uuid().optional(),
  brandId: z.uuid().optional(),
  supplierIds: z.array(z.uuid()).optional(),
});

export const getProductQueryParamsSchema = z.object({
  page: z.coerce
    .number()
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1),
  limit: z.coerce
    .number()
    .min(1, 'Limit must be at least 1')
    .optional()
    .default(10),
  search: z.string().optional().default(''),
});
