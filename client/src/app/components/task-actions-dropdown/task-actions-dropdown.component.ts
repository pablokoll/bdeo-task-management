import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-actions-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './task-actions-dropdown.component.html',
})
export class TaskActionsDropdownComponent {
  constructor(private taskService: TaskService) {}

  @Input({ required: true }) task!: Task;
  @Input({ required: true }) updateTask!: Function;
  @Input({ required: true }) deleteTask!: Function;
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
