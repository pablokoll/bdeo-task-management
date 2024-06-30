import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import { TaskStatusListComponent } from '../../components/task-status-list/task-status-list.component';
import { CreateTaskDto } from '../../shared/dto/create-task.dto';
import { TaskStatus } from '../../shared/enum/task-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskStatusListComponent, CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  showPopupCreateTask = false;

  openCreateTaskPopup(): void {
    this.showPopupCreateTask = true;
  }
  
  onClosePopup(): void {
    this.showPopupCreateTask = false;
  }

  onTaskCreated(task: CreateTaskDto): void {
    console.log('Task created:', task);
    this.showPopupCreateTask = false;
  }
  status = Object.keys(TaskStatus).map((status, index) => {
    return {
      status,
      index,
    };
  });
}
