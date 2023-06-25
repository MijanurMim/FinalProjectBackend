import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationConstants';

import { patientFilterableFields } from './patient.constant';
import { IPatient } from './patient.interface';
import { PatientService } from './patient.services';

// Get All Semesters
const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PatientService.getAllPatients(
    filters,
    paginationOptions
  );

  sendResponse<IPatient[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got All Patients successfully ',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PatientService.getSinglePatient(id);

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Received Successfully !!! ',
    data: result,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await PatientService.updatePatient(id, updatedData);

  sendResponse<IPatient>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient Updated Successfully !!! ',
    data: result,
  });
});

// const deletePatient = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await PatientService.deletePatient(id);

//   sendResponse<IPatient>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Patient Deleted Successfully !!! ',
//     data: result,
//   });
// });

export const PatientController = {
  getAllPatients,
  getSinglePatient,
  updatePatient,
};
