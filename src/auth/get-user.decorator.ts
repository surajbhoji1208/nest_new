//it is cumbersome to retrive it for all routs
//thats why we use this decorator to retrive it
import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );