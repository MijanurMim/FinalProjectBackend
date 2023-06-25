import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { PatientController } from './patient.controller';
import { PatientValidation } from './patient.validation';

const router = express.Router();

router.get('/:id', PatientController.getSinglePatient);

// router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(PatientValidation.updatePatientZodSchema),
  PatientController.updatePatient
);

router.get('/', PatientController.getAllPatients);

export const PatientRoutes = router;
