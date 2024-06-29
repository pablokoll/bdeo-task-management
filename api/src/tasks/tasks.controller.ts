import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ValidObjectIdPipe } from '../common/pipes/valid-objectid.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ValidObjectIdPipe()) id: string,
  ): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ValidObjectIdPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', new ValidObjectIdPipe()) id: string,
  ): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
