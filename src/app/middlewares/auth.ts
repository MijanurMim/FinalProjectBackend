import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import configIndex from '../../config/config.index';
import { Secret } from 'jsonwebtoken';

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not Authorized !');
      }

      console.log(token, 'From Auth Middleware');

      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(
        token,
        configIndex.jwt.secret as Secret
      );

      //  adding verifiedUser into user
      req.user = verifiedUser; //role , useId

      // role based access
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Not Allowed');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
