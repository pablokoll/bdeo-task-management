import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UpdateTaskDto } from '../../shared/dto/update-task.dto';
import { TaskStatus } from '../../shared/enum/task-status.enum';
import { TaskActionsDropdownComponent } from '../task-actions-dropdown/task-actions-dropdown.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, TaskActionsDropdownComponent],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  constructor(private taskService: TaskService) {}
  @Input() task!: Task;
  titleEdit: string = '';
  isEditing: boolean = false;

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.titleEdit = this.task.title;
  }

  updateTaskTitle() {
    if (this.isEditing && this.titleEdit) {
      if (
        this.titleEdit.toLocaleLowerCase() ===
        this.task.title.toLocaleLowerCase()
      ) {
        this.isEditing = false;
        return;
      }
      const taskId = this.task._id;
      const updateTaskDto = new UpdateTaskDto(this.titleEdit);
      this.taskService.updateTask(taskId, updateTaskDto).subscribe();
      this.task.title = this.titleEdit;
      this.isEditing = false;
    }
  }

  updateTaskStatus(task: Task) {
    const taskId = task._id;
    const newStatus =
      task.status === TaskStatus['TO-DO']
        ? TaskStatus['IN-PROGRESS']
        : TaskStatus.DONE;
    const updateTaskDto = new UpdateTaskDto(undefined, newStatus);
    this.taskService.updateTask(taskId, updateTaskDto).subscribe();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id).subscribe();
  }
}
