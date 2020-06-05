import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {FieldValidatorService} from '../field-validator.service';
import {SharedComponentValues} from '../../../components/shared-component-values';

@Component({
  selector: 'otus-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.css']
})
export class InputTextAreaComponent {
  @Input() title: string;
  @Input() placeholder: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() rows: number;
  private sharedComponentValues;

  constructor(public fieldValidator: FieldValidatorService) {
    this.sharedComponentValues = SharedComponentValues;
  }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
