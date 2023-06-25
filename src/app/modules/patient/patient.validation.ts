import { z } from 'zod';
import { bloodGroup, gender } from '../user/user.constant';

const updatePatientZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First Name is required',
          })
          .optional(),
        middleName: z
          .string({
            required_error: 'Middle Name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last Name is required',
          })
          .optional(),
      })
      .optional(),
    dateOfBirth: z
      .string({
        required_error: 'Date of Birth is Required',
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      })
      .optional(),
    bloodGroup: z
      .enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood Group is Required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Date of Birth is Required',
      })
      .email()
      .optional(),
    contactNo: z
      .string({
        required_error: 'Contact No is Required',
      })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency Contact No is Required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present Address is Required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent Address is Required',
      })
      .optional(),
    previousHistory: z
      .string({
        required_error: 'Previous History is Required',
      })
      .optional(),
    currentDisease: z
      .string({
        required_error: 'Current disease is Required',
      })
      .optional(),
    diseaseInfo: z
      .string({
        required_error: 'Disease Info is Required',
      })
      .optional(),

    profileImage: z
      .string({
        required_error: 'Profile Image is Required',
      })
      .optional(),
  }),
});

export const PatientValidation = { updatePatientZodSchema };
