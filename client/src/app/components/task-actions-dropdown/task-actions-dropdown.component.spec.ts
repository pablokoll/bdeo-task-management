import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskActionsDropdownComponent } from './task-actions-dropdown.component';

describe('TaskActionsDropdownComponent', () => {
  let component: TaskActionsDropdownComponent;
  let fixture: ComponentFixture<TaskActionsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskActionsDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskActionsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
