import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {AlertService, AuthenticationService} from '../../../providers';


const {required, email} = Validators;

@Component({
  selector: 'recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['../account.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  title = 'Recuperação de Senha';

  recoveryPasswordForm: FormGroup;
  loading = false;
  requiredMessage = environment.requiredMessage;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.recoveryPasswordForm = this.formBuilder.group({
      email: new FormControl('', [required, email])
    });
  }

  get rpForm() {
    return this.recoveryPasswordForm.controls;
  }

  onSubmit() {
    const informedEmail = this.rpForm.email.value.toLowerCase();
    if (this.recoveryPasswordForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.recoveryPassword(informedEmail)
      .toPromise()
      .then(() => this.alertService.success('Solicitação enviada por email'))
      .then(() => this.loading = false)
      .then(() => setInterval(() => this.redirectToLogin(), 3000))
      .catch((error) => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
