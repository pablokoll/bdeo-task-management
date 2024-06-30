import { getModelToken } from '@nestjs/mongoose';
import { Test, type TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../src/tasks/dto/update-task.dto';
import { Task, TaskStatus } from '../../src/tasks/schemas/task.schema';
import { TasksService } from '../../src/tasks/tasks.service';
import * as throwNotFoundException from '../../src/utils/not-found.exception';
import {
  generateArrayMockTasks,
  generateMockTaskMongo,
  generateRandomTaskTitle,
  mockTaskDefault,
} from './mocks/tasks.mock';

describe('TasksService', () => {
  let service: TasksService;
  let mockTaskModel: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTaskDefault),
            constructor: jest.fn().mockResolvedValue(mockTaskDefault),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    mockTaskModel = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const mockTask = generateMockTaskMongo();
      const createTaskDto: CreateTaskDto = {
        title: mockTask.title,
        description: mockTask.description,
      };

      jest
        .spyOn(mockTaskModel, 'create')
        .mockResolvedValueOnce(mockTask as any);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks: Task[] = generateArrayMockTasks();

      jest.spyOn(mockTaskModel, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockTasks),
      } as any);

      const result = await service.findAll();

      expect(result).toEqual(mockTasks);
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const mockTask = generateMockTaskMongo();

      jest.spyOn(mockTaskModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockTask),
      } as any);

      const result = await service.findOne(mockTask._id as string);

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task with given ID does not exist', async () => {
      const nonExistingTaskId = 'non-existing-id';

      jest.spyOn(mockTaskModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn(),
      } as any);
      const throwNotFoundExceptionMock = jest.spyOn(
        throwNotFoundException,
        'throwNotFoundException',
      );

      await expect(service.findOne(nonExistingTaskId)).rejects.toThrowError(
        `${Task.name} with id ${nonExistingTaskId} not found`,
      );
      expect(throwNotFoundExceptionMock).toHaveBeenCalledWith(
        Task.name,
        nonExistingTaskId,
      );
    });
  });

  describe('update', () => {
    it('should update a task by ID', async () => {
      const mockTask = generateMockTaskMongo(TaskStatus['TO-DO']);
      const updateTaskDto: UpdateTaskDto = {
        title: generateRandomTaskTitle(),
      };
      const mockTaskUpdated = {
        ...mockTask,
        ...updateTaskDto,
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTask);
      jest.spyOn(service, 'validateEditTitle');
      jest.spyOn(mockTaskModel, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockTaskUpdated),
      } as any);

      const result = await service.update(
        mockTask._id as string,
        updateTaskDto,
      );

      expect(result).toEqual(mockTaskUpdated);
      expect(service.validateEditTitle).toHaveBeenCalledWith(
        mockTask,
        updateTaskDto,
      );
    });

    it('should throw UnprocessableEntityException when editing title is not allowed', async () => {
      const mockTask = generateMockTaskMongo(TaskStatus['TO-DO']);
      const updateTaskDto: UpdateTaskDto = {
        title: mockTask.title,
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTask);
      jest.spyOn(service, 'validateEditTitle');

      await expect(
        service.update(mockTask._id as string, updateTaskDto),
      ).rejects.toThrowError('New title must be different from current title');
      expect(service.validateEditTitle).toHaveBeenCalledWith(
        mockTask,
        updateTaskDto,
      );
    });

    it('should throw UnprocessableEntityException when editing title with invalid status', async () => {
      const mockTask = generateMockTaskMongo(TaskStatus['IN-PROGRESS']);
      const updateTaskDto: UpdateTaskDto = {
        title: mockTask.title,
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTask);
      jest.spyOn(service, 'validateEditTitle');

      await expect(
        service.update(mockTask._id as string, updateTaskDto),
      ).rejects.toThrowError(
        'Title can only be edited when task is in "to-do" status',
      );
      expect(service.validateEditTitle).toHaveBeenCalledWith(
        mockTask,
        updateTaskDto,
      );
    });

    it('should throw UnprocessableEntityException when status transition is invalid', async () => {
      const mockTask = generateMockTaskMongo(TaskStatus['IN-PROGRESS']);
      const updateTaskDto: UpdateTaskDto = {
        status: TaskStatus['TO-DO'],
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTask);
      jest.spyOn(service, 'validateStatusTransitions');

      await expect(
        service.update(mockTask._id as string, updateTaskDto),
      ).rejects.toThrowError(
        `Invalid state transition: Changing from ${mockTask.status} to ${updateTaskDto.status} is not permitted.`,
      );
      expect(service.validateStatusTransitions).toHaveBeenCalledWith(
        mockTask,
        updateTaskDto,
      );
    });

    it('should throw UnprocessableEntityException when status is already done', async () => {
      const mockTask = generateMockTaskMongo(TaskStatus.DONE);
      const updateTaskDto: UpdateTaskDto = {
        status: TaskStatus['TO-DO'],
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTask);
      jest.spyOn(service, 'validateStatusTransitions');

      await expect(
        service.update(mockTask._id as string, updateTaskDto),
      ).rejects.toThrowError(`Cannot edit a task that is already done`);
      expect(service.validateStatusTransitions).toHaveBeenCalledWith(
        mockTask,
        updateTaskDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task by ID', async () => {
      const mockTask = generateMockTaskMongo();

      jest.spyOn(mockTaskModel, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockTask),
      } as any);

      const result = await service.remove(mockTask._id as string);

      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task with given ID does not exist', async () => {
      const nonExistingTaskId = 'non-existing-id';

      jest.spyOn(mockTaskModel, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.remove(nonExistingTaskId)).rejects.toThrowError(
        `${Task.name} with id ${nonExistingTaskId} not found`,
      );
      const throwNotFoundExceptionMock = jest.spyOn(
        throwNotFoundException,
        'throwNotFoundException',
      );
      expect(throwNotFoundExceptionMock).toHaveBeenCalledWith(
        Task.name,
        nonExistingTaskId,
      );
    });
  });
});
