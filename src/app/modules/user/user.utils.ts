import e from 'express';

import { User } from './user.model';

// Generate Patient Id
export const findLastPatientId = async (): Promise<string | undefined> => {
  const lastPatient = await User.findOne({ role: 'patient' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastPatient?.id ? lastPatient.id.substring(2) : undefined;
};

export const generatePatientId = async (): Promise<string> => {
  const currentId =
    (await findLastPatientId()) || e.toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `P-${incrementedId}`;

  return incrementedId;
};

// Generate Doctor Id
export const findLastDoctorId = async (): Promise<string | undefined> => {
  const lastDoctor = await User.findOne({ role: 'doctor' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastDoctor?.id ? lastDoctor.id.substring(2) : undefined;
};

export const generateDoctorId = async (): Promise<string> => {
  const currentId = (await findLastDoctorId()) || e.toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `Dr-${incrementedId}`;

  return incrementedId;
};

// Generate Admin Id
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || e.toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
