import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContactProjectService} from '../../providers/contact-project/contact-project.service';

@Component({
  selector: 'source-contact-project',
  templateUrl: './contact-project.component.html',
  styleUrls: ['./contact-project.component.css']
})
export class ContactProjectComponent implements OnInit {
  contactProjectForm: FormGroup;
  contactProjects: any[];

  constructor(
    private formBuilder: FormBuilder,
    private contactProjectService: ContactProjectService
  ) {
  }

  ngOnInit() {
    this.contactProjects = this.contactProjectService.getContactProject();
    this.contactProjectForm = this.formBuilder.group({});

  }

  onSubmit() {
    console.log('submeteu');

  }

  viewContact(){
    console.log("view")
  }
}
