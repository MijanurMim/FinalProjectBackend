import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DoctorController.getSingleDoctor
);

router.patch(
  '/:id',
  validateRequest(DoctorValidation.updateDoctorZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
  DoctorController.updateDoctor
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
  DoctorController.deleteDoctor
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DoctorController.getAllDoctors
);

export const DoctorRoutes = router;
