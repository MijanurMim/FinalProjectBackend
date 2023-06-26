import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DiseaseInfoValidation } from './diseaseInfo.validation';
import { DiseaseInfoController } from './diseaseInfo.controller';

const router = express.Router();

router.post(
  '/create-disease',
  validateRequest(DiseaseInfoValidation.createDiseaseInfoZodSchema),
  DiseaseInfoController.createDiseaseInfo
);

router.patch(
  '/:id',
  validateRequest(DiseaseInfoValidation.updateDiseaseInfoZodSchema),
  DiseaseInfoController.updateDiseaseInfo
);

router.get('/:id', DiseaseInfoController.getSingleDiseaseInfo);

router.delete('/:id', DiseaseInfoController.deleteDiseaseInfo);

router.get('/', DiseaseInfoController.getAllDiseaseInfo);

export const DiseaseInfoRoutes = router;
