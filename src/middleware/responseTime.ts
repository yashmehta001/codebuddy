import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, baseUrl: url } = req;
    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const statusCode = res.statusCode;
      console.log(`${method} ${url} ${statusCode} ${responseTime}ms`);
    });
    next();
  }
}
