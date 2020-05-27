import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'otus-project-contact-item',
  templateUrl: './project-contact-item.component.html',
  styleUrls: ['./project-contact-item.component.css']
})
export class ProjectContactItemComponent implements OnInit {

   @Input() public contactItem: any;
  answerForm: FormGroup;
  private viewAnswerFormState: boolean = false;
  loadingLastMessage: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectContactService: ProjectContactService) {}


  ngOnInit() {
    this.answerForm = this.fb.group({
      answer:['', [Validators.required, Validators.maxLength(500)]]
    })
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
    this.router.navigate([`/project-contact/${contactItem.id}/messages`]);


  }
}
