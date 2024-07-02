import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../shared/enum/task-status.enum';
import { providerTaskServiceMock } from '../../shared/mocks/task-service.mock';
import { generateMockTask } from '../../shared/mocks/tasks.mock';
import { InputErrorValidationsComponent } from '../input-error-validations/input-error-validations.component';
import { CreateTaskComponent } from './create-task.component';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InputErrorValidationsComponent,
        CreateTaskComponent,
      ],
      providers: [{ provide: TaskService, useValue: providerTaskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    taskServiceSpy.createTask.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty controls', () => {
    const form = component.taskForm;
    expect(form).toBeTruthy();
    expect(form.get('title')?.value).toBe('');
    expect(form.get('description')?.value).toBe('');
  });

  it('should not emit taskCreated on invalid form submission', () => {
    component.taskForm.setValue({
      title: null,
      description: null,
    });
    spyOn(component.taskCreated, 'emit');
    component.onSubmit();
    expect(taskServiceSpy.createTask).not.toHaveBeenCalled();
    expect(component.taskCreated.emit).not.toHaveBeenCalled();
  });

  it('should emit taskCreated and reset form on valid form submission', () => {
    const task = generateMockTask(TaskStatus['TO-DO']);
    component.taskForm.setValue({
      title: task.title,
      description: task.description,
    });

    taskServiceSpy.createTask.and.returnValue(of());

    spyOn(component.taskCreated, 'emit');
    spyOn(component, 'onCancel');
    component.onSubmit();

    expect(taskServiceSpy.createTask).toHaveBeenCalledWith({
      title: task.title,
      description: task.description,
    });
    expect(component.taskCreated.emit).toHaveBeenCalledWith({
      title: task.title,
      description: task.description,
    });
    expect(component.onCancel).toHaveBeenCalled();
    expect(component.taskForm.pristine).toBeTrue();
    expect(component.taskForm.untouched).toBeTrue();
  });

  it('should emit closePopup on cancel', () => {
    spyOn(component.closePopup, 'emit');
    component.onCancel();
    expect(component.closePopup.emit).toHaveBeenCalled();
  });
});
