import { Test, type TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from '../../src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../src/tasks/dto/update-task.dto';
import { TasksController } from '../../src/tasks/tasks.controller';
import { TasksService } from '../../src/tasks/tasks.service';
import {
  generateArrayMockTasks,
  generateMockTaskMongo,
  generateRandomTaskId,
  generateRandomTaskStatus,
  generateRandomTaskTitle,
  mockTask,
  mockTaskDefault,
} from './mocks/tasks.mock';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createdTask = mockTask;
      const createTaskDto: CreateTaskDto = {
        title: createdTask.title,
        description: createdTask.description,
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdTask);

      const result = await controller.create(createTaskDto);

      expect(result).toEqual(createdTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = generateArrayMockTasks();

      jest.spyOn(service, 'findAll').mockResolvedValue(tasks);

      const result = await controller.findAll();

      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a single task by ID', async () => {
      const mockTaskMongo = generateMockTaskMongo();
      const mockTaskMongoId = mockTaskMongo._id as string;

      jest.spyOn(service, 'findOne').mockResolvedValue(mockTaskMongo);

      const result = await controller.findOne(mockTaskMongoId);

      expect(result).toEqual(mockTaskMongo);
    });
  });

  describe('update', () => {
    it('should update a title task by ID', async () => {
      const mockTaskId = generateRandomTaskId();
      const mockTask = mockTaskDefault;
      const updateTaskDto: UpdateTaskDto = {
        title: generateRandomTaskTitle(),
      };

      const updatedTask = {
        _id: mockTaskId,
        ...mockTask,
        ...updateTaskDto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

      const result = await controller.update(mockTaskId, updateTaskDto);

      expect(result).toEqual(updatedTask);
    });

    it('should update a status task by ID', async () => {
      const mockTaskId = generateRandomTaskId();
      const mockTask = mockTaskDefault;
      const updateTaskDto: UpdateTaskDto = {
        status: generateRandomTaskStatus(),
      };

      const updatedTask = {
        _id: mockTaskId,
        ...mockTask,
        ...updateTaskDto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTask);

      const result = await controller.update(mockTaskId, updateTaskDto);

      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should remove a task by ID', async () => {
      const mockTaskId = generateRandomTaskId();
      const deletedMockTask = mockTask;

      const deletedTask = {
        _id: mockTaskId,
        ...deletedMockTask,
      };
      jest.spyOn(service, 'remove').mockResolvedValue(deletedTask);

      const result = await controller.remove(mockTaskId);

      expect(result).toBe(deletedTask);
    });
  });
});
