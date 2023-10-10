import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Master } from 'src/master/entities/master.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Master => {
    const req = ctx.switchToHttp().getRequest();
    return req.user; // NE PAS RENOMMER
    // c'est toujours la propriété user de req que l'on retourne
  },
);
