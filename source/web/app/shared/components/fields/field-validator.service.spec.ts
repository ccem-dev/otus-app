import {TestBed} from '@angular/core/testing';

import {FieldValidatorService} from './field-validator.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

describe('FieldValidatorService', () => {
  let service: FieldValidatorService
  let mockForm: FormGroup;
  let fb: FormBuilder = new FormBuilder();

  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(FieldValidatorService);
    mockForm = fb.group({
      title: ["", [Validators.required]]
    });
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('hasErrorValidate should ', function () {
    expect(service.hasErrorValidate(mockForm, "required")).toBeFalse();
  });
});
