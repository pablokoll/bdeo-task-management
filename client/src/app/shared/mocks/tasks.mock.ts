import { faker } from '@faker-js/faker';
import { Task } from '../../models/task.model';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../enum/task-status.enum';

export const mockCreateTaskDto: CreateTaskDto = {
  title: generateRandomTaskTitle(),
  description: faker.lorem.paragraph({ min: 2, max: 4 }),
};

export function generateMockTask(status?: TaskStatus): Task {
  return {
    _id: generateRandomTaskId(),
    title: generateRandomTaskTitle(),
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    status: status ? status : faker.helpers.enumValue(TaskStatus),
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
  const tasksStatusArr = Object.values(TaskStatus);
  return faker.helpers.arrayElement(tasksStatusArr);
}
