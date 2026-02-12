import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.create({ ...createUserDto, organizationId: req.user.organizationId });
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('email') email?: string,
  ) {
    const filter = email ? { email: { contains: email } } : {};
    return this.usersService.findAll(req.user.organizationId, page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.usersService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(id, req.user.organizationId, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(id, req.user.organizationId);
  }
}