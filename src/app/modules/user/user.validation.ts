import { z } from 'zod';
import { bloodGroup, gender } from './user.constant';

const createPatientZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    patient: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is Required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is Required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is Required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Date of Birth is Required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact No is Required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is Required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is Required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is Required',
      }),
      previousHistory: z.string({
        required_error: 'Previous History is Required',
      }),
      previousPrescriptions: z
        .string({
          required_error: 'Previous Prescription is Required',
        })
        .optional(),
      currentDisease: z.string({
        required_error: 'Current Disease is Required',
      }),
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
  }),
});

const createDoctorZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    doctor: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      bloodGroup: z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      chamberAddress: z.string({
        required_error: 'Chamber Address is required',
      }),

      medicalQualifications: z.string({
        required_error: 'Medical Qualifications is required',
      }),

      SpecialistIn: z.string({
        required_error: 'Specialist in is required',
      }),

      profileImage: z
        .string({
          required_error: 'Profile Image is required',
        })
        .optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createPatientZodSchema,
  createDoctorZodSchema,
  createAdminZodSchema,
};
