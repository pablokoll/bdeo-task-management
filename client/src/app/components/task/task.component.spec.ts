import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UpdateTaskDto } from '../../shared/dto/update-task.dto';
import { TaskStatus } from '../../shared/enum/task-status.enum';
import { providerTaskServiceMock } from '../../shared/mocks/task-service.mock';
import {
  generateMockTask,
  generateRandomTaskTitle,
} from '../../shared/mocks/tasks.mock';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  const mockTask: Task = generateMockTask(TaskStatus['TO-DO']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent, ReactiveFormsModule],
      providers: [{ provide: TaskService, useValue: providerTaskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    taskServiceSpy.updateTask.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle edit mode and set form control value', () => {
    component.toggleEdit();
    expect(component.isEditing).toBeTrue();
    expect(component.titleForm.value.editTitle).toBe(mockTask.title);
  });

  it('should initialize form with empty controls', () => {
    const form = component.titleForm;
    expect(form).toBeTruthy();
    expect(form.get('editTitle')?.value).toBe('');
  });

  it('should update task title', () => {
    const updatedTitle = generateRandomTaskTitle();
    component.isEditing = true;
    component.titleForm.setValue({ editTitle: updatedTitle });
    taskServiceSpy.updateTask.and.returnValue(of());

    component.updateTaskTitle();

    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(
      mockTask._id,
      new UpdateTaskDto(updatedTitle)
    );
    expect(component.task.title).toBe(updatedTitle);
    expect(component.isEditing).toBeFalse();
  });

  it('should not update task title if invalid or same as current', () => {
    const randomTitle = generateRandomTaskTitle();
    component.titleForm.setValue({ editTitle: '' });
    component.task.title = randomTitle;

    component.updateTaskTitle();

    expect(taskServiceSpy.updateTask).not.toHaveBeenCalled();
    expect(component.isEditing).toBeFalse();
  });

  it('should update task status', () => {
    const updatedStatus = TaskStatus['IN-PROGRESS'];
    taskServiceSpy.updateTask.and.returnValue(of());

    component.updateTaskStatus(mockTask);

    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(
      mockTask._id,
      new UpdateTaskDto(undefined, updatedStatus)
    );
  });

  it('should delete task', () => {
    taskServiceSpy.deleteTask.and.returnValue(of());

    component.deleteTask(mockTask);

    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(mockTask._id);
  });
});
