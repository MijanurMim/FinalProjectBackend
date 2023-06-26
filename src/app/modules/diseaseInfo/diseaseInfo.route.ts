import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DiseaseInfoValidation } from './diseaseInfo.validation';
import { DiseaseInfoController } from './diseaseInfo.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/create-disease',
  validateRequest(DiseaseInfoValidation.createDiseaseInfoZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  DiseaseInfoController.createDiseaseInfo
);

router.patch(
  '/:id',
  validateRequest(DiseaseInfoValidation.updateDiseaseInfoZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  DiseaseInfoController.updateDiseaseInfo
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DiseaseInfoController.getSingleDiseaseInfo
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DiseaseInfoController.deleteDiseaseInfo
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DOCTOR, ENUM_USER_ROLE.PATIENT),
  DiseaseInfoController.getAllDiseaseInfo
);

export const DiseaseInfoRoutes = router;
