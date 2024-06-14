import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadData } from '../common/types/jwt-payload-data';

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayloadData => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.user);
    return req.user;
  },
);
