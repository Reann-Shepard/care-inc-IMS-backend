import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // const user = await this.prismaService.user.findUnique({
    //   where: { id: request.user.id },
    // });
    if (!user) {
      return false;
    }

    const foundUser = await this.prismaService.user.findUnique({
      where: { id: user.sub }, // JWT 토큰의 sub 필드를 사용하여 사용자 검색
    });
    if (!foundUser) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
