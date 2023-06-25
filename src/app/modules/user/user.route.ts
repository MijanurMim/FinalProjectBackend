import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-patient',
  validateRequest(UserValidation.createPatientZodSchema),
  UserController.createPatient
);
router.post(
  '/create-doctor',
  validateRequest(UserValidation.createDoctorZodSchema),
  UserController.createDoctor
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
