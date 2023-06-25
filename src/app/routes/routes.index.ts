import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

import { PatientRoutes } from '../modules/patient/patient.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';

import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DiseaseInfo } from '../modules/diseaseInfo/diseaseInfo.model';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/patient',
    route: PatientRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/disease-info',
    route: DiseaseInfo,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
