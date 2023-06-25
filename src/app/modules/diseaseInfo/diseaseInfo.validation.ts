import { z } from 'zod';

// create validation
const createDiseaseInfoZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
  }),
});

// update validation
const updateDiseaseInfoZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),

    description: z.string().optional(),
  }),
});

export const DiseaseInfoValidation = {
  createDiseaseInfoZodSchema,
  updateDiseaseInfoZodSchema,
};
