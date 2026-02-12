import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status?: string,
  ) {
    const filter = status ? { status } : {};
    return this.tasksService.findAll(req.user.organizationId, page, limit, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(id, req.user.organizationId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.tasksService.update(id, req.user.organizationId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(id, req.user.organizationId);
  }
}