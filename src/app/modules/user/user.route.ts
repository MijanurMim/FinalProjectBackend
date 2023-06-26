import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-patient',
  validateRequest(UserValidation.createPatientZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PATIENT),
  UserController.createPatient
);
router.post(
  '/create-doctor',

  validateRequest(UserValidation.createDoctorZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR),
  UserController.createDoctor
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
