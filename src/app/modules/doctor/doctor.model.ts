import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from '../user/user.constant';
import { DoctorModel, IDoctor } from './doctor.interface';

export const DoctorSchema = new Schema<IDoctor, DoctorModel>(
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

    chamberAddress: {
      type: String,
      required: true,
    },

    medicalQualifications: {
      type: String,
      required: true,
    },

    specialistIn: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Doctor = model<IDoctor, DoctorModel>('Doctor', DoctorSchema);
