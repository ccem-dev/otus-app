import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountClientService, AlertService, AuthenticationService} from '../../../providers';
import {first} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {MustMatch} from '../../../utils';

const {required, email, pattern} = Validators;

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../account.scss']
})
export class CreateAccountComponent implements OnInit {
  title = 'Definir senha';

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  requiredMessage = environment.requiredMessage;
  private token: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private accountClientService: AccountClientService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.registerForm = this.formBuilder.group({
      password: new FormControl('', [required, pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z-0-9\d$@$!%*?&].{4,}')]),
      confirmPassword: new FormControl('', [required])
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.f.password.setErrors({confirm: 'sda'});
      this.f.confirmPassword.setErrors({confirm: 'sda'});
    }

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountClientService.register(this.token, this.registerForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Senha cadastrada com sucesso', true);
          this.router.navigate(['/login']);
        },
        error => {
          if (error.match('Invalid token')) {
            this.alertService.error('Token invalido');
          } else {
            this.alertService.error('Ocorreu um erro, entre em contato com o administrador do sistema');
          }
          this.loading = false;
        });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
