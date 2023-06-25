/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllDoctorsisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { IDoctor, IDoctorFilters } from './doctor.interface';
import { doctorSearchableFields } from './doctor.constant';
import { Doctor } from './doctor.model';

const getAllDoctors = async (
  filters: IDoctorFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDoctor[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: doctorSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Doctor.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Doctor.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDoctor = async (id: string): Promise<IDoctor | null> => {
  const result = await Doctor.findOne({ id });

  return result;
};

const updateDoctor = async (
  id: string,
  payload: Partial<IDoctor>
): Promise<IDoctor | null> => {
  const isExist = await Doctor.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found !');
  }

  const { name, ...doctorData } = payload;
  const updatedDoctorData: Partial<IDoctor> = { ...doctorData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IDoctor>;
      (updatedDoctorData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Doctor.findOneAndUpdate({ id }, updatedDoctorData, {
    new: true,
  });
  return result;
};

const deleteDoctor = async (id: string): Promise<IDoctor | null> => {
  // check if the Doctor is exist
  const isExist = await Doctor.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doctor not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete Doctor first
    const doctor = await Doctor.findOneAndDelete({ id }, { session });
    if (!Doctor) {
      throw new ApiError(404, 'Failed to delete Doctor');
    }
    //delete user
    await User.deleteOne({ id });

    session.commitTransaction();
    session.endSession();

    return doctor;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const DoctorService = {
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
