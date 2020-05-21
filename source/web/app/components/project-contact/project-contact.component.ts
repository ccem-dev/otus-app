import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../providers/project-contact/project-contact.service';

@Component({
  selector: 'source-project-contact',
  templateUrl: './project-contact.component.html',
  styleUrls: ['./project-contact.component.css']
})
export class ProjectContactComponent implements OnInit {
  projectContactForm: FormGroup;
  projectContacts: any[];
  panelOpenState: boolean;
  viewCallFormState: boolean;


  constructor(
    private fb: FormBuilder,
    private projectContactService: ProjectContactService
  ) {
  }

  ngOnInit() {
    this.projectContacts = this.projectContactService.getProjectContacts();
    this.projectContactForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)] ],
      description: ['', [Validators.required, Validators.maxLength(500)] ],
    });
    this.panelOpenState = false;
    this.viewCallFormState = false;
  }


  onSubmit() {
    console.log('submeteu');

  }

  onReset(){
    console.log('reset');
  }

  viewContact(contact){
    contact.view = true;

  }

  accessCallForm() {
    this.viewCallFormState = true;
  }
}
