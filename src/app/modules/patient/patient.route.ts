import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { PatientController } from './patient.controller';
import { PatientValidation } from './patient.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  PatientController.getSinglePatient
);

// router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(PatientValidation.updatePatientZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PATIENT),
  PatientController.updatePatient
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  PatientController.getAllPatients
);

export const PatientRoutes = router;
