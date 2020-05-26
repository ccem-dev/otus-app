import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../providers/project-contact/project-contact.service';
import {ProjectContact} from '../../model/contact/project-contact';
import {create} from 'domain';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';

@Component({
  selector: 'source-project-contact',
  templateUrl: './project-contact.component.html',
  styleUrls: ['./project-contact.component.css']
})
export class ProjectContactComponent implements OnInit {
  projectContactForm: FormGroup;
  projectContacts: ProjectContact[] = [];
  panelOpenState: boolean;
  viewCallFormState: boolean;


  constructor(
    private fb: FormBuilder,
    private projectContactService: ProjectContactService,
    ) {}

  ngOnInit() {
    this.getProjectContacts();
    this.projectContactForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.panelOpenState = false;
    this.viewCallFormState = false;
  }


  onSubmit() {
    this.projectContactForm.markAllAsTouched();
    if (this.projectContactForm.invalid) {
      return;
    }

    this.create(new ProjectContact(this.projectContactForm.getRawValue(), "fulano@email.com"));
  }

  onReset() {
    this.projectContactForm.reset();
  }

  changeViewCallFormState() {
    this.viewCallFormState = !this.viewCallFormState;
    this.onReset();
  }

  getProjectContacts(): void{
    this.projectContactService.getProjectContacts()
      .subscribe((projectContacts: ProjectContact[]) => this.projectContacts = projectContacts);
  }

  private create(projectContact: ProjectContact): void {
    this.projectContactService.createProjectContact(projectContact)
      .subscribe(() => [
        this.getProjectContacts(),
        this.changeViewCallFormState(),
        this.projectContactService.showMessage("comunicação OK: Chamado gravado")
        ],
        () => this.projectContactService.showMessage("Falha na comunicação: Chamado não gravado", true));
  }
}
