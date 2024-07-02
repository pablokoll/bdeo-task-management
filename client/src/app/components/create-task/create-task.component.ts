import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CreateTaskDto } from '../../shared/dto/create-task.dto';
import { InputErrorValidationsComponent } from '../input-error-validations/input-error-validations.component';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, InputErrorValidationsComponent],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {}

  @Output() taskCreated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
  });

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.createTask(this.taskForm.value as CreateTaskDto);
      this.taskCreated.emit(this.taskForm.value);
      this.onCancel();
      this.taskForm.reset();
    }
  }

  createTask(createTaskDto: CreateTaskDto): void {
    this.taskService.createTask(createTaskDto).subscribe();
  }

  onCancel(): void {
    this.closePopup.emit();
  }
}
