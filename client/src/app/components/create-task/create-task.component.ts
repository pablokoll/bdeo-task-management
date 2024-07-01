import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CreateTaskDto } from '../../shared/dto/create-task.dto';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {}

  @Output() formClosed = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>();

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(30),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.min(5),
      Validators.max(200),
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
    this.taskService.createTask(createTaskDto).subscribe(
      (response) => {
        // console.log('Task created successfully:', response);
      },
      (error) => {
        // console.error('Error creating task:', error);
      }
    );
  }

  onCancel(): void {
    this.closePopup.emit();
  }
}
