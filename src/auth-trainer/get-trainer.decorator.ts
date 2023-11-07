import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Trainer } from 'src/trainer/entities/trainer.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Trainer => {
    const req = ctx.switchToHttp().getRequest();
    return req.user; // NE PAS RENOMMER
    // c'est toujours la propriété user de req que l'on retourne
  },
);
