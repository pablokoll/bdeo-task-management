import { Component, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-status-list',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './task-status-list.component.html',
})
export class TaskStatusListComponent {
  @Input() statusName = '';
}
