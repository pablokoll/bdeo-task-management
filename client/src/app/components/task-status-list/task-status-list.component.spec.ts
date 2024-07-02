import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { providerTaskServiceMock } from '../../shared/mocks/task-service.mock';
import { generateArrayMockTasks } from '../../shared/mocks/tasks.mock';
import { statusTitleParser } from '../../utils/statusTitleParser';
import { TaskComponent } from '../task/task.component';
import { TaskStatusListComponent } from './task-status-list.component';

describe('TaskStatusListComponent', () => {
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CommonModule, TaskComponent, TaskStatusListComponent],
      providers: [{ provide: TaskService, useValue: providerTaskServiceMock }],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(TaskStatusListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should parse the title correctly', () => {
    const fixture = TestBed.createComponent(TaskStatusListComponent);
    const component = fixture.componentInstance;
    const title = 'TO-DO';
    const parsedTitle = statusTitleParser(title);
    expect(component.titleParser(title)).toEqual(parsedTitle);
  });

  it('should have an empty tasks array by default', () => {
    const fixture = TestBed.createComponent(TaskStatusListComponent);
    const component = fixture.componentInstance;
    expect(component.tasks).toEqual([]);
  });

  it('should render tasks correctly', () => {
    const fixture = TestBed.createComponent(TaskStatusListComponent);
    const component = fixture.componentInstance;
    const tasks: Task[] = generateArrayMockTasks()
    component.tasks = tasks;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-task').length).toBe(tasks.length);
  });

  it('should have required statusName input', () => {
    const fixture = TestBed.createComponent(TaskStatusListComponent);
    const component = fixture.componentInstance;
    expect(component.statusName).toEqual('');
  });
});
