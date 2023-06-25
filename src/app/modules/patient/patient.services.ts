import { IPaginationOptions } from '../../../interfaces/paginationOptions';

import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import { IPatient, IPatientFilters } from './patient.interface';
import { patientSearchableFields } from './patient.constant';

import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Patient } from './patient.model';

// Get All Patients with pagination-Search-Filters functionality
const getAllPatients = async (
  filters: IPatientFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPatient[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: patientSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // converting filterData object to array for checking if there is any item
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

  // checking there is any search/filter query attached or not
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Patient.find(whereConditions)
    .populate('diseaseInfo')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Patient.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePatient = async (id: string): Promise<IPatient | null> => {
  const result = await Patient.findOne({ id }).populate('diseaseInfo');

  return result;
};

const updatePatient = async (
  id: string,
  payload: Partial<IPatient>
): Promise<IPatient | null> => {
  const isExist = await Patient.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient Not Found');
  }

  // Destructuring the embedded fields from Patients data
  const { name, ...PatientData } = payload;

  const updatedPatientData: Partial<IPatient> = { ...PatientData };

  // dynamically handling embedded data for partial update
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;

      (updatedPatientData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Patient.findOneAndUpdate(
    { id: id },
    updatedPatientData,
    {
      new: true,
    }
  );

  return result;
};

// Delete single Patient
// const deletePatient = async (id: string): Promise<IPatient | null> => {
//   const result = await Patient.findByIdAndDelete(id)
//     .populate('academicSemester')
//     .populate('academicDepartment')
//     .populate('academicFaculty');

//   return result;
// };

export const PatientService = {
  getAllPatients,
  getSinglePatient,
  updatePatient,
};
