import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne() {}

  @Post()
  async create() {}

  @Put(':id')
  async update() {}

  @Delete(':id')
  async remove() {}
}
