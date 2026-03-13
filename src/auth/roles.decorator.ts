import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../constants/user-roles';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
