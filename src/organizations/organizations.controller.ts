import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('organizations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('name') name?: string,
  ) {
    const filter = name ? { name: { contains: name } } : {};
    return this.organizationsService.findAll(page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}