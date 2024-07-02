import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { statusTitleParser } from '../../utils/statusTitleParser';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-status-list',
  standalone: true,
  templateUrl: './task-status-list.component.html',
  imports: [CommonModule, TaskComponent],
})
export class TaskStatusListComponent {
  @Input({ required: true }) statusName = '';
  @Input() tasks: Task[] = [];

  titleParser(title: string): string {
    return statusTitleParser(title);
  }
}
