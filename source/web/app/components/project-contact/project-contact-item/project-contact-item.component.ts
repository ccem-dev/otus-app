import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';
import {OtusToasterService} from '../../../shared/services/otus-toaster.service';

@Component({
  selector: 'otus-project-contact-item',
  templateUrl: './project-contact-item.component.html',
  styleUrls: ['./project-contact-item.component.css']
})
export class ProjectContactItemComponent implements OnInit {

  @Input() public contactItem: any;
  private messageForm: FormGroup;
  private viewMessageFormState: boolean = false;
  private networkLoading: boolean;
  private isEmptyMessages: boolean

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectContactService: ProjectContactService,
    private otusToasterService: OtusToasterService) {}

  ngOnInit() {
    this.isEmptyMessages = true;
    this.messageForm = this.fb.group({
      text:['', [Validators.required, Validators.maxLength(500)]]
    })
    this.networkLoading = true;
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
        this.otusToasterService.showMessage('comunicação OK: Mensagem enviada'),
        this.changeViewMessageFormState(),
        contactItem.messages[0] = message,
        this.isEmptyMessages = false
        ],
        () => this.otusToasterService.showMessage('Falha na comunicação: Mensagem não enviada', true));
  }

  loadContactItemContent(contact: ProjectContact) {
    if(!contact.messages)
      this.projectContactService.getLastMessage(contact.id)
        .subscribe( lastMessage => [
          this.verifyMessages(lastMessage),
          this.projectContactService.addLastMessage(contact, lastMessage),
          this.networkLoading = false
        ])
  }

  onReset() {
    this.messageForm.reset();
  }

  changeViewMessageFormState() {
    this.viewMessageFormState = !this.viewMessageFormState;
    this.onReset();
  }

  goToMessages(contactItem: any) {
    this.router.navigate([`/project-contact/${contactItem.id}/messages/`], {state: contactItem});
  }

  private verifyMessages(messages): void{
    if(messages.length === 0) this.isEmptyMessages = true;
    else this.isEmptyMessages = false;
  }


}
