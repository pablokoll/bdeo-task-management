import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-actions-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './task-actions-dropdown.component.html',
})
export class TaskActionsDropdownComponent {
  constructor(private taskService: TaskService, private eRef: ElementRef) {}

  @Input({ required: true }) task!: Task;
  @Input({ required: true }) updateTask!: (task: Task) => void;
  @Input({ required: true }) deleteTask!: (task: Task) => void;
  isOpen = false;

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
