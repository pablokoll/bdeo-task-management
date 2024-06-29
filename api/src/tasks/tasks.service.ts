import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwNotFoundException } from '../utils/not-found.exception';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.taskModel.create(createTaskDto);
    return createdTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id }).exec();
    if (!task) {
      throwNotFoundException(Task.name, id);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (updateTaskDto.title) {
      this.validateEditTitle(task, updateTaskDto);
    }

    if (updateTaskDto.status) {
      this.validateStatusTransitions(task, updateTaskDto);
    }

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      { new: true },
    );
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throwNotFoundException(Task.name, id);
    }
    return deletedTask;
  }

  validateEditTitle(task: Task, updateTask: UpdateTaskDto): void {
    if (updateTask.status !== TaskStatus.TO_DO) {
      throw new UnprocessableEntityException(
        'Title can only be edited when task is in "to-do" status',
      );
    }

    if (task.title === updateTask.title) {
      throw new UnprocessableEntityException(
        'New title must be different from current title',
      );
    }
  }

  validateStatusTransitions(task: Task, updateTask: UpdateTaskDto): void {
    if (task.status === updateTask.status) {
      throw new UnprocessableEntityException(
        'New status must be different from current status',
      );
    }
    const tasksStatusNames: string[] = Object.keys(TaskStatus);
    const currentStatus = tasksStatusNames.indexOf(
      task.status.toLocaleUpperCase(),
    );
    const newStatus = tasksStatusNames.indexOf(
      updateTask.status.toLocaleUpperCase(),
    );
    if (newStatus < currentStatus) {
      throw new UnprocessableEntityException(
        `Invalid state transition: Changing from ${task.status} to ${updateTask.status} is not permitted.`,
      );
    }
  }
}
