import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../providers/project-contact/project-contact.service';
import {ProjectContact} from '../../model/contact/project-contact';
import {create} from 'domain';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {OtusToasterService} from '../../shared/services/otus-toaster.service';
import {AuthenticationService} from '../../providers';

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
  user: any

  constructor(
    private fb: FormBuilder,
    private projectContactService: ProjectContactService,
    private otusToasterService: OtusToasterService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.getProjectContacts();
    this.projectContactForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      message: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.panelOpenState = false;
    this.viewCallFormState = false;
    this.authenticationService.CurrentUser.subscribe(user => this.user = user);
  }


  onSubmit() {
    this.projectContactForm.markAllAsTouched();
    if (this.projectContactForm.invalid) {
      return;
    }

    this.create(new ProjectContact(this.projectContactForm.getRawValue(), this.user.email));
  }

  onReset() {
    this.projectContactForm.reset();
  }

  changeViewCallFormState() {
    this.viewCallFormState = !this.viewCallFormState;
    this.onReset();
  }

  getProjectContacts(): void {
    this.projectContactService.getProjectContacts()
      .subscribe((projectContacts: ProjectContact[]) => this.projectContacts = projectContacts);
  }

  private create(projectContact: ProjectContact): void {
    this.projectContactService.createProjectContact(projectContact)
      .subscribe(() => [
          this.getProjectContacts(),
          this.changeViewCallFormState(),
          this.otusToasterService.showMessage('comunicação OK: Chamado criado')
        ],
        () => this.otusToasterService.showMessage('Falha na comunicação: Chamado não criado', true));
  }
}
