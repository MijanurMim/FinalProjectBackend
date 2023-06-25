import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import httpStatus from 'http-status';

import pick from '../../../shared/pick';

import { paginationFields } from '../../../constants/paginationConstants';
import { Request, Response } from 'express';
import { IDiseaseInfo } from './diseaseInfo.interface';
import { diseaseInfoFilterableFields } from './diseaseInfo.constant';
import { DiseaseInfoService } from './diseaseInfo.services';

// Create New DiseaseInfo
const createDiseaseInfo = catchAsync(async (req: Request, res: Response) => {
  const { ...diseaseInfoData } = req.body;
  const result = await DiseaseInfoService.createDiseaseInfo(diseaseInfoData);

  sendResponse<IDiseaseInfo>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DiseaseInfo Created Successfully',
    data: result,
  });
});

// Get All DiseaseInfo
const getAllDiseaseInfo = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, diseaseInfoFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DiseaseInfoService.getAllDiseaseInfos(
    filters,
    paginationOptions
  );

  console.log(paginationOptions);

  sendResponse<IDiseaseInfo[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got All DiseaseInfos successfully ',
    meta: result.meta,
    data: result.data,
  });
});

// Get Single DiseaseInfo
const getSingleDiseaseInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DiseaseInfoService.getSingleDiseaseInfo(id);

  sendResponse<IDiseaseInfo>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DiseaseInfo Received Successfully !!! ',
    data: result,
  });
});

// Update single DiseaseInfo
const updateDiseaseInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await DiseaseInfoService.updateDiseaseInfo(id, updatedData);

  sendResponse<IDiseaseInfo>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DiseaseInfo Updated Successfully !!! ',
    data: result,
  });
});

// Delete DiseaseInfo
const deleteDiseaseInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DiseaseInfoService.deleteDiseaseInfo(id);

  sendResponse<IDiseaseInfo>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DiseaseInfo Deleted Successfully !!! ',
    data: result,
  });
});

export const DiseaseInfoController = {
  createDiseaseInfo,
  getAllDiseaseInfo,
  getSingleDiseaseInfo,
  updateDiseaseInfo,
  deleteDiseaseInfo,
};
