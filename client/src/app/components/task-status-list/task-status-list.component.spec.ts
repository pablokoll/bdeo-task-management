import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusListComponent } from './task-status-list.component';

describe('TaskStatusListComponent', () => {
  let component: TaskStatusListComponent;
  let fixture: ComponentFixture<TaskStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
