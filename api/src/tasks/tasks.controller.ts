import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotEmptyObjectPipe } from '../common/pipes/not-empty-object.pipe';
import { ValidObjectIdPipe } from '../common/pipes/valid-objectid.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({
    type: CreateTaskDto,
    description: 'Json structure for task object',
  })
  @ApiCreatedResponse({
    description: 'Created successfully',
    type: Task,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({
    type: Task,
    isArray: true,
  })
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Task,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async findOne(
    @Param('id', new ValidObjectIdPipe()) id: string,
  ): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateTaskDto,
    description: 'Json structure for task object',
  })
  @ApiOkResponse({
    type: Task,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('id', new ValidObjectIdPipe()) id: string,
    @Body(new NotEmptyObjectPipe()) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted Successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  async remove(
    @Param('id', new ValidObjectIdPipe()) id: string,
  ): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
