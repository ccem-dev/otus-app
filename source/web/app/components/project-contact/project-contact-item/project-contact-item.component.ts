import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../../providers/project-contact/project-contact.service';

@Component({
  selector: 'source-project-contact-item',
  templateUrl: './project-contact-item.component.html',
  styleUrls: ['./project-contact-item.component.css']
})
export class ProjectContactItemComponent implements OnInit {

   @Input() public contactItem: any;
  feedBackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectContactService: ProjectContactService) {}

  ngOnInit() {
    this.feedBackForm = this.fb.group({
      feedBack:['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  onSubmit(){
    this.feedBackForm.markAllAsTouched();
    if(this.feedBackForm.invalid){
      return
    }
    this._createFeedBack(this.feedBackForm.getRawValue());
  }

  private _createFeedBack(feedBackItem){
    this.projectContactService.createFeedBack(feedBackItem);

  }

}
