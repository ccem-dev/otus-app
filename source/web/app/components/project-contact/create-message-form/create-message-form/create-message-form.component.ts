import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactValues} from '../../project-contact-values';
import {ProjectContactService} from '../../../../providers/project-contact/project-contact.service';
import {OtusToasterService} from '../../../../shared/services/otus-toaster.service';
import {Message} from '../../../../model/contact/message/message';

@Component({
  selector: 'otus-create-message-form',
  templateUrl: './create-message-form.component.html',
  styleUrls: ['./create-message-form.component.css']
})
export class CreateMessageFormComponent implements OnInit {
  @Input() public contactItem: any;
  @Output() public notifyNewMessage = new EventEmitter<Message>();
  private messageForm: FormGroup;
  private viewMessageFormState: boolean = false;
  private projectContactValues;

  constructor(
    private fb: FormBuilder,
    private projectContactService: ProjectContactService,
    private otusToasterService: OtusToasterService
  ) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      text:['', [Validators.required, Validators.maxLength(500)]]
    })
    this.projectContactValues = ProjectContactValues
  }

  onSubmit(){
    this.messageForm.markAllAsTouched();
    if(this.messageForm.invalid){
      return
    }
    this._createMessage(this.messageForm.getRawValue(), this.contactItem);
  }

  private _createMessage(messageForm, contactItem){
    let message = this.projectContactService.buildMessage(messageForm.text, contactItem);
    this.projectContactService.createMessage(contactItem.id, message)
      .subscribe(() => [
          this.otusToasterService.showMessage(ProjectContactValues.toaster.message.createSucess),
          this.changeViewMessageFormState(),
          this.notifyNewMessage.emit(message)
        ],
        () => this.otusToasterService.showMessage(ProjectContactValues.toaster.message.createFail, true));
  }

  onReset() {
    this.messageForm.reset();
  }

  changeViewMessageFormState() {
    this.viewMessageFormState = !this.viewMessageFormState;
    this.onReset();
  }

}
