import { Schema, model } from 'mongoose';

import { bloodGroup, gender } from '../user/user.constant';
import { IPatient, PatientModel } from './patient.interface';

export const patientSchema = new Schema<IPatient, PatientModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      required: true,
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      // required: true,
    },

    diseaseInfo: {
      type: Schema.Types.ObjectId,
      ref: 'DiseaseInfo',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Patient = model<IPatient, PatientModel>('Patient', patientSchema);
