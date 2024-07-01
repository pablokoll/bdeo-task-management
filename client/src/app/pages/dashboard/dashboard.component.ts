import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../../components/create-task/create-task.component';
import { TaskStatusListComponent } from '../../components/task-status-list/task-status-list.component';
import { TaskService } from '../../services/task.service';
import { CreateTaskDto } from '../../shared/dto/create-task.dto';
import { TaskStatus } from '../../shared/enum/task-status.enum';
import { StatusList } from '../../shared/types/status-list.type';
import { TasksLists } from '../../shared/types/tasks-lists';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskStatusListComponent, CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statusList: StatusList[] = [];
  tasksLists: TasksLists = {
    'to-do': [],
    'in-progress': [],
    'done': []
  };

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    Object.keys(TaskStatus).forEach((status, index) => {
      this.statusList.push({
        name: status,
        index,
      });
    });
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasksLists = this.taskService.assignTasks(tasks);
    });
  }
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
}
