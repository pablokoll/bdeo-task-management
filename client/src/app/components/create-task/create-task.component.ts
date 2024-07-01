import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent implements OnInit {
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
      this.taskCreated.emit(this.taskForm.value);
      this.onCancel();
      this.taskForm.reset();
    }
  }

  onCancel(): void {
    this.closePopup.emit();
  }
}
