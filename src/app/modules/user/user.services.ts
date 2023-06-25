import { IPatient } from '../patient/patient.interface';

import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

import mongoose from 'mongoose';

import httpStatus from 'http-status';

import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import {
  generateAdminId,
  generateDoctorId,
  generatePatientId,
} from './user.utils';
import { Patient } from '../patient/patient.model';
import { IDoctor } from '../doctor/doctor.interface';
import { Doctor } from '../doctor/doctor.model';

const createPatient = async (
  patient: IPatient,
  user: IUser
): Promise<IUser | null> => {
  // set role
  user.role = 'patient';

  // generate Patient id
  // implementing transaction and rollback
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generatePatientId();
    user.id = id;
    patient.id = id;
    const newPatient = await Patient.create([patient], { session });

    if (!newPatient.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed To Create New Patient'
      );
    }

    // set Patient --> _id into user.Patient
    user.patient = newPatient[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'patient',
      populate: [{ path: 'diseaseInfo' }],
    });
  }

  return newUserAllData;
};

const createDoctor = async (
  doctor: IDoctor,
  user: IUser
): Promise<IUser | null> => {
  // set role
  user.role = 'doctor';

  // generate Doctor id
  // implementing transaction and rollback
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateDoctorId();
    user.id = id;
    doctor.id = id;

    const newDoctor = await Doctor.create([doctor], { session });

    if (!newDoctor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create New Doctor');
    }

    user.doctor = newDoctor[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed To Create User');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'doctor',
    });
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // set role
  user.role = 'admin';

  // generate Doctor id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
    });
  }

  return newUserAllData;
};

export const UserService = {
  createPatient,
  createDoctor,
  createAdmin,
};
