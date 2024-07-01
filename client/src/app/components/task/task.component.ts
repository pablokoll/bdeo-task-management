import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UpdateTaskDto } from '../../shared/dto/update-task.dto';
import { TaskStatus } from '../../shared/enum/task-status.enum';
import { InputErrorValidationsComponent } from '../input-error-validations/input-error-validations.component';
import { TaskActionsDropdownComponent } from '../task-actions-dropdown/task-actions-dropdown.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TaskActionsDropdownComponent,
    InputErrorValidationsComponent,
  ],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  constructor(private taskService: TaskService) {}
  @Input() task!: Task;
  titleForm = new FormGroup({
    editTitle: new FormControl(this.task?.title, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });
  isEditing: boolean = false;

  toggleEdit() {
    this.titleForm.setValue({ editTitle: this.task.title });
    this.isEditing = !this.isEditing;
  }

  updateTaskTitle() {
    if (this.isEditing && this.titleForm.value.editTitle) {
      if (
        this.titleForm.value.editTitle.toLocaleLowerCase() ===
          this.task.title.toLocaleLowerCase() ||
        this.titleForm.value.editTitle.length < 3 ||
        this.titleForm.value.editTitle.length > 30
      ) {
        this.isEditing = false;
        return;
      }
      const taskId = this.task._id;
      const updateTaskDto = new UpdateTaskDto(this.titleForm.value.editTitle);
      this.taskService.updateTask(taskId, updateTaskDto).subscribe();
      this.task.title = this.titleForm.value.editTitle;
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
