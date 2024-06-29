import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwNotFoundException } from '../utils/not-found.exception';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';

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
    const task = this.taskModel.findOne({ _id: id }).exec();
    if (!task) {
      throwNotFoundException(Task.name, id);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      { new: true },
    );
    if (!updatedTask) {
      throwNotFoundException(Task.name, id);
    }
    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throwNotFoundException(Task.name, id);
    }
    return deletedTask;
  }
}
