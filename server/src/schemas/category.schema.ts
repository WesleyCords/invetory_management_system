import z from 'zod';

export const ResponseCategory = z.object({
  message: z.string(),
  data: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
    }),
  ),
});
