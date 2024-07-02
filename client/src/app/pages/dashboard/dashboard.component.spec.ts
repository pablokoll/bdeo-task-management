import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import { TaskStatusListComponent } from '../../components/task-status-list/task-status-list.component';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../shared/enum/task-status.enum';
import { providerTaskServiceMock } from '../../shared/mocks/task-service.mock';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const spy = providerTaskServiceMock;
    spy.tasks$ = of([]);
    spy.assignTasks.and.returnValue({
      'to-do': [],
      'in-progress': [],
      done: [],
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CreateTaskComponent,
        TaskStatusListComponent,
        DashboardComponent,
      ],
      providers: [{ provide: TaskService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize statusList correctly', () => {
    expect(component.statusList.length).toBe(Object.keys(TaskStatus).length);
    component.statusList.forEach((status, index) => {
      expect(status.name).toBe(Object.keys(TaskStatus)[index]);
      expect(status.index).toBe(index);
    });
  });

  it('should load tasks on initialization', () => {
    expect(taskServiceSpy.getTasks).toHaveBeenCalled();
    expect(taskServiceSpy.assignTasks).toHaveBeenCalled();
    expect(component.tasksLists).toEqual({
      'to-do': [],
      'in-progress': [],
      done: [],
    });
  });

  it('should show create task popup when openCreateTaskPopup is called', () => {
    component.showPopupCreateTask = false;
    component.togglePopup();
    expect(component.showPopupCreateTask).toBeTrue();
  });

  it('should hide create task popup when onClosePopup is called', () => {
    component.showPopupCreateTask = false;
    component.togglePopup();
    component.togglePopup();
    expect(component.showPopupCreateTask).toBeFalse();
  });
});
