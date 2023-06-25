import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
// import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createPatient: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { patient, ...userData } = req.body;
    const result = await UserService.createPatient(patient, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Patient Created Successfully !!!',
      data: result,
    });
  }
);

const createDoctor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { doctor, ...userData } = req.body;
    const result = await UserService.createDoctor(doctor, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Doctor Created Successfully !!!',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Created Successfully !!!',
      data: result,
    });
  }
);

export const UserController = {
  createPatient,
  createAdmin,
  createDoctor,
};
