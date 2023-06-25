import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IDoctor = {
  id: string;
  name: UserName;
  profileImage?: string;
  email: string;
  contactNo: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  chamberAddress: string;
  medicalQualifications: string;
  specialistIn: string;
};

export type DoctorModel = Model<IDoctor, Record<string, unknown>>;

export type IDoctorFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  chamberAddress?: string;
  medicalQualifications?: string;
  specialistIn?: string;
};
