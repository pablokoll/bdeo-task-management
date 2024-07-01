import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../models/task.model';
import { CreateTaskDto } from '../shared/dto/create-task.dto';
import { UpdateTaskDto } from '../shared/dto/update-task.dto';
import { TaskStatus } from '../shared/enum/task-status.enum';
import {
  generateArrayMockTasks,
  generateMockTask,
  generateRandomTaskId,
  generateRandomTaskTitle,
} from '../shared/mocks/tasks.mock';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTasks: Task[] = generateArrayMockTasks();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks from the API', () => {
    service.getTasks();
    const req = httpMock.expectOne(`/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);

    service.tasks$.subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });
  });

  it('should assign tasks to their respective statuses', () => {
    const tasksLists = service.assignTasks(mockTasks);

    expect(
      tasksLists['to-do'].every((task) => task.status === 'to-do')
    ).toBeTruthy();
    expect(
      tasksLists['in-progress'].every((task) => task.status === 'in-progress')
    ).toBeTruthy();
    expect(
      tasksLists['done'].every((task) => task.status === 'done')
    ).toBeTruthy();
  });

  it('should create a new task', () => {
    const newTask: Task = generateMockTask(TaskStatus['TO-DO']);
    const createTaskDto: CreateTaskDto = {
      title: newTask.title,
      description: newTask.description,
    };

    service.createTask(createTaskDto).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update a task', () => {
    const updatedTask: Task = generateMockTask(TaskStatus['TO-DO']);
    const updateTaskDto: UpdateTaskDto = {
      title: generateRandomTaskTitle(),
    };

    service.updateTask(updatedTask._id, updateTaskDto).subscribe();

    const req = httpMock.expectOne(`/tasks/${updatedTask._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = generateRandomTaskId()
    service.deleteTask(taskId).subscribe();

    const req = httpMock.expectOne(`/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
