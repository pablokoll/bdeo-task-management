import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error-validations',
  standalone: true,
  imports: [],
  templateUrl: './input-error-validations.component.html',
})
export class InputErrorValidationsComponent {
  @Input() control: AbstractControl | null = null;
  @Input() touched?: boolean = true;

  get errorKeys(): string [] {
    return this.control ? Object.keys(this.control.errors || {}) : [];
  }

  getErrorMessage(errorKey: string): string {
    const messages: { [key: string]: string } = {
      required: 'This field is required.',
      minlength: `Minimum length is ${
        this.control?.getError('minlength')?.requiredLength
      }.`,
      maxlength: `Maximum length is ${
        this.control?.getError('maxlength')?.requiredLength
      }.`,
      pattern: 'Invalid input format.',
    };
    return messages[errorKey] || 'Invalid input';
  }
}
