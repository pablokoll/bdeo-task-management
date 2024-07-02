import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../../services/task.service';
import { providerTaskServiceMock } from '../../shared/mocks/task-service.mock';
import { generateMockTask } from '../../shared/mocks/tasks.mock';
import { TaskActionsDropdownComponent } from './task-actions-dropdown.component';

describe('TaskActionsDropdownComponent', () => {
  let component: TaskActionsDropdownComponent;
  let fixture: ComponentFixture<TaskActionsDropdownComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let elementRefMock: jasmine.SpyObj<ElementRef>;

  beforeEach(async () => {
    taskServiceSpy = providerTaskServiceMock
    elementRefMock = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    await TestBed.configureTestingModule({
      imports: [TaskActionsDropdownComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ElementRef, useValue: elementRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskActionsDropdownComponent);
    component = fixture.componentInstance;
    component.task = generateMockTask()
    component.updateTask = jasmine.createSpy('updateTask');
    component.deleteTask = jasmine.createSpy('deleteTask');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown state when toggleDropdown is called', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');

    component.toggleDropdown(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.isOpen).toBeTrue();

    component.toggleDropdown(event);

    expect(component.isOpen).toBeFalse();
  });

  it('should close dropdown when clicking outside', () => {
    component.isOpen = true;
    const event = new Event('click');
    spyOn(event, 'stopPropagation');

    elementRefMock.nativeElement.contains = jasmine
      .createSpy('contains')
      .and.returnValue(false);

    component.onClickOutside(event);

    expect(component.isOpen).toBeFalse();
  });
});
