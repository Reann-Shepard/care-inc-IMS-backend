import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      console.error('here?1');
      console.error('No token provided');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req['user'] = decoded;
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
