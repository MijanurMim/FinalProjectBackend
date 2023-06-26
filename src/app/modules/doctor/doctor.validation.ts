import { z } from 'zod';

const updateDoctorZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),

    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    chamberAddress: z.string().optional(),

    medicalQualifications: z.string().optional(),
    specialistIn: z.string().optional(),
  }),
});

export const DoctorValidation = {
  updateDoctorZodSchema,
};
