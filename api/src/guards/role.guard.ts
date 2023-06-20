import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string>(
            'roles',
            context.getHandler(),
        );
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();

        const user = request.user;

        const hasPermission = requiredRoles.trim().toLocaleLowerCase() === user.role.trim().toLocaleLowerCase();

        return hasPermission;
    }
}