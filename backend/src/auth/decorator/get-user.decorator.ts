import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();

  if (data) {
    // tslint:disable-next-line
    // @ts-ignore
    return request.user[data];
  }
  // tslint:disable-next-line
  // @ts-ignore
  return request.user;
});
