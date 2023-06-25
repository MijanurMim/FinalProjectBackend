import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import routes from './app/routes/routes.index';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

// import ApiError from './errors/ApiError'

const app: Application = express();

// Cors
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Application Routes
app.use('/api/v1/', routes);

// Global Error Handler
app.use(globalErrorHandler);

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not Found',
      },
    ],
  });

  next();
});

export default app;
