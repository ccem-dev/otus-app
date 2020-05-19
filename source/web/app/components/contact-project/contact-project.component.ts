import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'source-contact-project',
  templateUrl: './contact-project.component.html',
  styleUrls: ['./contact-project.component.css']
})
export class ContactProjectComponent implements OnInit {
  contactProjectForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.contactProjectForm = this.formBuilder.group({

    })
  }

  onSubmit() {
    console.log("submeteu")

  }
}
