import { Model, Types } from 'mongoose';
import { IDiseaseInfo } from '../diseaseInfo/diseaseInfo.interface';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// patient interface
export type IPatient = {
  id: string;
  name: UserName;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  previousHistory?: string;
  previousPrescriptions?: string;
  currentDisease?: string;
  profileImage?: string;
  diseaseInfo?: Types.ObjectId | IDiseaseInfo;
};

export type IPatientFilters = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};

export type PatientModel = Model<IPatient, Record<string, unknown>>;
