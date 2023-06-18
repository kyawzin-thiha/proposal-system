import { SetMetadata } from '@nestjs/common';

export const Role = (role: 'ADMIN' | 'User') => SetMetadata('role', role);
