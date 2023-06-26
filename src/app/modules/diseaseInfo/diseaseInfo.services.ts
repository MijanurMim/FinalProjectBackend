import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/paginationOptions';
import { diseaseInfoSearchableFields } from './diseaseInfo.constant';
import { IDiseaseInfo, IDiseaseInfoFilters } from './diseaseInfo.interface';
import { DiseaseInfo } from './diseaseInfo.model';

// Creating New DiseaseInfo
const createDiseaseInfo = async (
  payload: IDiseaseInfo
): Promise<IDiseaseInfo> => {
  const result = await DiseaseInfo.create(payload);

  return result;
};

// Get All DiseaseInfos with pagination-Search-Filters functionality
const getAllDiseaseInfos = async (
  filters: IDiseaseInfoFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDiseaseInfo[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: diseaseInfoSearchableFields.map(field => ({
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

  const result = await DiseaseInfo.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await DiseaseInfo.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single DiseaseInfo
const getSingleDiseaseInfo = async (
  id: string
): Promise<IDiseaseInfo | null> => {
  const result = await DiseaseInfo.findById(id);

  return result;
};

// Update Single DiseaseInfo
const updateDiseaseInfo = async (
  id: string,
  payload: Partial<IDiseaseInfo>
): Promise<IDiseaseInfo | null> => {
  const result = await DiseaseInfo.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete single DiseaseInfo
const deleteDiseaseInfo = async (id: string): Promise<IDiseaseInfo | null> => {
  const result = await DiseaseInfo.findByIdAndDelete(id);

  return result;
};

export const DiseaseInfoService = {
  createDiseaseInfo,
  getAllDiseaseInfos,
  getSingleDiseaseInfo,
  updateDiseaseInfo,
  deleteDiseaseInfo,
};
