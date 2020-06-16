import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextAreaComponent } from './input-text-area.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('InputTextAreaComponent', () => {
  let component: InputTextAreaComponent;
  let fixture: ComponentFixture<InputTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextAreaComponent ],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextAreaComponent);
    component = fixture.componentInstance;
    component.controlName = "MockName"
    component.formGroup = new FormGroup({MockName: new FormControl()})
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formControl should return instance of FormControl', function () {
    expect(component.formControl).toBeInstanceOf(FormControl)
  });
});
