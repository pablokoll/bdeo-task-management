import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputErrorValidationsComponent } from './input-error-validations.component';

describe('InputErrorValidationsComponent', () => {
  let component: InputErrorValidationsComponent;
  let fixture: ComponentFixture<InputErrorValidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputErrorValidationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return error keys', () => {
    const control = new FormControl('', Validators.required);
    component.control = control;

    expect(component.errorKeys).toEqual(['required']);
  });

  it('should return required error message', () => {
    const control = new FormControl('', Validators.required);
    component.control = control;

    const errorMessage = component.getErrorMessage('required');
    expect(errorMessage).toBe('This field is required.');
  });
});
