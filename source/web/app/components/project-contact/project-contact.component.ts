import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectContactService} from '../../providers/project-contact/project-contact.service';
import {ProjectContact} from '../../model/contact/project-contact';
import {OtusToasterService} from '../../shared/services/otus-toaster.service';
import {AuthenticationService} from '../../providers';
import {User} from '../../model';
import {ProjectContactValues} from './project-contact-values';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'source-project-contact',
  templateUrl: './project-contact.component.html',
  styleUrls: ['./project-contact.component.css']
})
export class ProjectContactComponent implements OnInit {
  panelOpenState: boolean;
  viewCallFormState: boolean;
  networkLoading: boolean;
  isEmptyProjectContacts: boolean;
  projectContactValues;
  @Output() projectContacts: ProjectContact[] = [];
  private projectContactForm: FormGroup;
  private user: User;


  constructor(
    private fb: FormBuilder,
    private projectContactService: ProjectContactService,
    private otusToasterService: OtusToasterService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.networkLoading = true;
    this.isEmptyProjectContacts = false;
    this.getProjectContacts();
    this.projectContactForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      text: ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.panelOpenState = false;
    this.viewCallFormState = false;
    this.authenticationService.CurrentUser.subscribe(user => this.user = user);
    this.projectContactValues = ProjectContactValues;
  }


  onSubmit() {
    this.projectContactForm.markAllAsTouched();
    if (this.projectContactForm.invalid) {
      return;
    }
    this.create(new ProjectContact(this.projectContactForm.getRawValue()));
  }

  onReset() {
    this.projectContactForm.reset();
  }

  changeViewCallFormState() {
    this.viewCallFormState = !this.viewCallFormState;
    this.onReset();
  }

  // getProjectContacts(): void {
  //   this.projectContactService.getProjectContacts()
  //     .toPromise()
  //     .then(({data}: any) => [
  //       this.projectContacts = data,
  //       this.verifyProjectContacts(this.projectContacts),
  //       this.networkLoading = false,
  //     ]);
  // }


  // getProjectContacts(): void {
  //   this.projectContactService.getProjectContacts()
  //     .pipe(
  //       tap((data) => console.log(data)),
  //       map((issues) => [
  //         this.verifyProjectContacts(issues),
  //         this.networkLoading = false,
  //         this.projectContacts = issues
  //         ]
  //       ));
  // }


  getProjectContacts(): void {
    this.projectContactService.getProjectContacts()
      .pipe(
        tap((data) => {
          console.log(data);
        }))
      .subscribe((issues) => [
        this.projectContacts = issues,
        this.verifyProjectContacts(this.projectContacts),
        this.networkLoading = false
  ]);
  }


  // getProjectContacts(): void {
  //   this.projectContactService.getProjectContacts()
  //     .pipe(
  //       tap((data) => {
  //         console.log(data);
  //       }))
  //     .subscribe(({data}: any) => [
  //       this.projectContacts = data,
  //       this.verifyProjectContacts(this.projectContacts),
  //       this.networkLoading = false,
  //     ]);
  // }

  private create(projectContact: ProjectContact): void {
    this.projectContactService.createProjectContact(projectContact)
      .subscribe(() => [
          this.changeViewCallFormState(),
          this.otusToasterService.showMessage(this.projectContactValues.toaster.issue.createSuccess),
          this.getProjectContacts()
        ],
        () => this.otusToasterService
          .showMessage(this.projectContactValues.toaster.issue.createFail, true));

  }

  private verifyProjectContacts(projectContacts): void {
    if (projectContacts.length === 0) {
      this.isEmptyProjectContacts = true;
    } else {
      this.isEmptyProjectContacts = false;
    }
  }
}
