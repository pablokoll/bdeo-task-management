import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import * as tasksList from '../../src/common/data/tasks.json';
import { UpdateTaskDto } from '../../src/tasks/dto/update-task.dto';
import { TaskStatus } from '../../src/tasks/schemas/task.schema';
import { TasksService } from '../../src/tasks/tasks.service';
import { generateRandomTaskTitle, mockCreateTaskDto } from './mocks/tasks.mock';

describe('Tasks', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let tasksService: TasksService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    configService = moduleRef.get<ConfigService>(ConfigService);
    tasksService = moduleRef.get<TasksService>(TasksService);
    await app.init();

    const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');
    await mongoose.connect(databaseUrl);
    await mongoose.connection.db.dropDatabase();

    await tasksService.seed();
  });

  describe('GET', () => {
    it(`/tasks (GET)`, async () => {
      const response = await request(app.getHttpServer()).get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body[0]).toMatchObject(tasksList[0]);
      expect(response.body.length).toBe(tasksList.length);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('/tasks/:id (GET)', async () => {
      const taskCreated = await tasksService.create(mockCreateTaskDto);
      const taskId = taskCreated._id.toString();

      const response = await request(app.getHttpServer()).get(
        `/tasks/${taskId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', taskId);
    });
  });

  describe('POST', () => {
    it('/tasks (POST)', async () => {
      const createTaskDto = mockCreateTaskDto;

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(createTaskDto);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toEqual(createTaskDto.title);
      expect(response.body.description).toEqual(createTaskDto.description);
      expect(response.body.status).toEqual(TaskStatus['TO-DO']);
    });
  });

  describe('PUT', () => {
    it('/tasks/:id (PUT)', async () => {
      const taskCreated = await tasksService.create(mockCreateTaskDto);
      const taskId = taskCreated._id.toString();

      const updateTaskDto: UpdateTaskDto = {
        title: generateRandomTaskTitle(),
      };

      const response = await request(app.getHttpServer())
        .put(`/tasks/${taskId}`)
        .send(updateTaskDto);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', taskId);
      expect(response.body.title).toEqual(updateTaskDto.title);
    });
  });

  describe('DELETE', () => {
    it('/tasks/:id (DELETE)', async () => {
      const taskCreated = await tasksService.create(mockCreateTaskDto);
      const taskId = taskCreated._id.toString();

      const response = await request(app.getHttpServer()).delete(
        `/tasks/${taskId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', taskId);
    });
  });

  afterAll(async () => {
    await app.close();
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });
});
