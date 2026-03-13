import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Public } from '../auth/public.decorator';
import { UserRole } from '../constants/user-roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    // Para registro público, a organização deve ser fornecida no body
    const organizationId = createUserDto.organizationId;
    if (!organizationId) {
      throw new BadRequestException('Organization ID is required for public registration');
    }
    return this.usersService.create({ ...createUserDto, organizationId });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('email') email?: string,
  ) {
    // Validação de segurança - garantir que o usuário está autenticado
    if (!req.user || !req.user.organizationId) {
      throw new Error('Unauthorized access - missing user context');
    }
    
    // Validação de segurança - usuário só pode acessar usuários da sua organização
    const userOrganizationId = req.user.organizationId;
    const filter = email ? { email: { contains: email }, organizationId: userOrganizationId } : { organizationId: userOrganizationId };
    return this.usersService.findAll(userOrganizationId, page, limit, filter);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    // Validação de segurança - usuário só pode acessar usuários da sua organização
    if (!req.user || !req.user.organizationId) {
      throw new Error('Unauthorized access - missing user context');
    }
    
    return this.usersService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    // Validação de segurança - usuário só pode editar usuários da sua organização
    if (!req.user || !req.user.organizationId) {
      throw new Error('Unauthorized access - missing user context');
    }
    
    // Validação de segurança - usuário só pode editar seu próprio perfil ou ser admin
    if (req.user.id !== id && req.user.role !== 'ADMIN') {
      throw new Error('Access denied - can only edit own profile or requires admin role');
    }
    
    return this.usersService.update(id, req.user.organizationId, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(id, req.user.organizationId);
  }
}
