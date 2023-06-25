/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IPatient } from '../patient/patient.interface';
import { IDoctor } from '../doctor/doctor.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  patient?: Types.ObjectId | IPatient;
  doctor?: Types.ObjectId | IDoctor;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
