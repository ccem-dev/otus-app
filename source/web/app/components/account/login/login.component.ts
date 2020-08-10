import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../providers/account/authentication/authentication.service';
import {AlertService} from '../../../providers/alert/alert.service';
import {first} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {projectName, banner} from '../../../../assets/visual-identity/data.json';

const {required, email} = Validators;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../account.scss']
})
export class LoginComponent implements OnInit {

  title = projectName;
  banner = banner;
  hide = true;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  requiredMessage = environment.requiredMessage;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [required, email]),
      password: new FormControl('', [required])
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let email = this.f.email.value.toLowerCase();
    this.authenticationService.login(email, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  redirectToRecoveryPassword() {
    this.router.navigate(['/recovery-password']);
  }
}
