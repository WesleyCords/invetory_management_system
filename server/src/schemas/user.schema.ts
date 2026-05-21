import z from 'zod';
import { RolesProfile } from '@prisma/client';

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, 'The name must be more than 5 characters long')
    .max(50, 'The name must be no more than 50 characters long')
    .regex(
      /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)+$/,
      'It is must be a full name (first and last name)',
    ),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z-.]+$/,
      'Invalid username format (use only lowercase letters, dots, or hyphens)',
    )
    .min(5, 'The username must be more than 5 characters long'),
  password: z
    .string()
    .regex(/^\d+$/, 'The password must contain only numbers')
    .min(6, 'The password must be more than 6 characters long')
    .max(8, 'The password must be no more than 8 characters long'),
});

export const registerUserResponseSchema = z.object({
  data: z.object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    role: z.enum(RolesProfile),
  }),
  message: z.string(),
});

export const loginUserSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z-.]+$/,
      'Invalid username format (use only lowercase letters, dots, or hyphens)',
    )
    .min(5, 'The username must be more than 5 characters long'),
  password: z
    .string()
    .regex(/^\d+$/, 'The password must contain only numbers')
    .min(6, 'The password must be more than 6 characters long')
    .max(8, 'The password must be no more than 8 characters long'),
});

export const loginUserSchemaResponse = z.object({
  token: z.string(),
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    username: z.string(),
    role: z.enum(RolesProfile),
  }),
  message: z.string(),
});
