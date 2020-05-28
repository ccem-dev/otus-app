import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';
import {ProjectContact} from '../../../model/contact/project-contact';

@Component({
  selector: 'otus-project-contact-item',
  templateUrl: './project-contact-item.component.html',
  styleUrls: ['./project-contact-item.component.css']
})
export class ProjectContactItemComponent implements OnInit {

  @Input() public contactItem: any;
  answerForm: FormGroup;

  private viewAnswerFormState: boolean = false;
  private loadingLastMessage: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectContactService: ProjectContactService) {}


  ngOnInit() {
    this.answerForm = this.fb.group({
      answer:['', [Validators.required, Validators.maxLength(500)]]
    })
    this.loadingLastMessage = true;
  }

  onSubmit(){
    this.answerForm.markAllAsTouched();
    if(this.answerForm.invalid){
      return
    }
    this._createAnswer(this.answerForm.getRawValue());
  }

  private _createAnswer(answerItem){
    this.projectContactService.createAnswer(answerItem);

  }

  onReset() {

  }

  changeViewAnswerFormState() {
    this.viewAnswerFormState = !this.viewAnswerFormState;
    this.onReset();

  }

  goToMessages(contactItem: any) {
    this.router.navigate([`/project-contact/${contactItem.id}/messages`, { contact: contactItem }]);
  }

  openPanel(contact: ProjectContact) {
    if(!contact.messages)
      this.projectContactService.getLastMessage(contact)
        .subscribe( message => [
          this.projectContactService.addContactMessages(contact, message),
          this.loadingLastMessage = false
        ])
  }
}
