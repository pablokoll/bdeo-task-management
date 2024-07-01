import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorValidationsComponent } from './input-error-validations.component';

describe('InputErrorValidationsComponent', () => {
  let component: InputErrorValidationsComponent;
  let fixture: ComponentFixture<InputErrorValidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputErrorValidationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputErrorValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
