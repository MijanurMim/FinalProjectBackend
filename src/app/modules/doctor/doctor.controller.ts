import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { paginationFields } from '../../../constants/paginationConstants';
import { doctorFilterableFields } from './doctor.constant';
import { IDoctor } from './doctor.interface';
import { DoctorService } from './doctor.services';

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization);

  const filters = pick(req.query, doctorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DoctorService.getAllDoctors(filters, paginationOptions);

  sendResponse<IDoctor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctors retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DoctorService.getSingleDoctor(id);

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor retrieved successfully !',
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await DoctorService.updateDoctor(id, updatedData);

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor updated successfully !',
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DoctorService.deleteDoctor(id);

  sendResponse<IDoctor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor deleted successfully !',
    data: result,
  });
});

export const DoctorController = {
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
};
