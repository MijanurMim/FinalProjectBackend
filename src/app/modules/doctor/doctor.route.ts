import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DoctorController } from './doctor.controller';
import { DoctorValidation } from './doctor.validation';

const router = express.Router();

router.get('/:id', DoctorController.getSingleDoctor);

router.patch(
  '/:id',
  validateRequest(DoctorValidation.updateDoctorZodSchema),
  DoctorController.updateDoctor
);

router.delete('/:id', DoctorController.deleteDoctor);

router.get('/', DoctorController.getAllDoctors);

export const DoctorRoutes = router;
