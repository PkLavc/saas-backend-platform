import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectsService.create({ ...createProjectDto, organizationId: req.user.organizationId });
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('name') name?: string,
  ) {
    const filter = name ? { name: { contains: name } } : {};
    return this.projectsService.findAll(req.user.organizationId, page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.projectsService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Request() req) {
    return this.projectsService.update(id, req.user.organizationId, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(id, req.user.organizationId);
  }
}