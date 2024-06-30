import { faker } from '@faker-js/faker';
import { CreateTaskDto } from '../../../src/tasks/dto/create-task.dto';
import { Task, TaskStatus } from '../../../src/tasks/schemas/task.schema';

export const mockTaskDefault = {
  title: generateRandomTaskTitle(),
  description: faker.lorem.paragraph({ min: 2, max: 4 }),
  status: TaskStatus['TO-DO'],
};

export const mockTask = generateMockTask();

export const mockCreateTaskDto: CreateTaskDto = {
  title: generateRandomTaskTitle(),
  description: faker.lorem.paragraph({ min: 2, max: 4 }),
};

function generateMockTask(status?: TaskStatus): Task {
  return {
    title: generateRandomTaskTitle(),
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    status: status ? status : faker.helpers.enumValue(TaskStatus),
  };
}

export function generateMockTaskMongo(status?: TaskStatus): Task {
  const task = generateMockTask(status);
  return {
    ...task,
    _id: generateRandomTaskId(),
    __v: 0,
  };
}

export function generateArrayMockTasks(): Task[] {
  return faker.helpers.multiple(() => generateMockTask(), {
    count: { min: 3, max: 10 },
  });
}

export function generateRandomTaskTitle(): string {
  return faker.lorem.words({ min: 2, max: 3 });
}

export function generateRandomTaskId(): string {
  return faker.database.mongodbObjectId();
}
export function generateRandomTaskStatus(): TaskStatus {
  return faker.helpers.arrayElement([
    TaskStatus['IN-PROGRESS'],
    TaskStatus.DONE,
  ]);
}
