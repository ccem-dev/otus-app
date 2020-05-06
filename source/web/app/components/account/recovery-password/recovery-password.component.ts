import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

const {required, email} = Validators;

@Component({
  selector: 'recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['../account.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  title = 'Recuperação de Senha';


  recoveryPasswordForm: FormGroup
  loading = false;
  submitted = false;
  requiredMessage = environment.requiredMessage;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.recoveryPasswordForm = this.formBuilder.group({
      email: new FormControl('', [required, email])
    });
  }

  get f(){
    return this.recoveryPasswordForm.controls;

  }

  onSubmit() {
    let email = this.f.email.value.toLowerCase();
  }

  redirectToLogin(){
    this.router.navigate(['/login']);

  }

}
