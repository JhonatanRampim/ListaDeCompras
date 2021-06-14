import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  loginForm: FormGroup;
  isSubmitted = false;
  isLoading: boolean;
  route: Router;
  constructor(public formBuilder: FormBuilder,
    public loginService: LoginService,
    private router: Router,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      pass: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  EnterSubmit($event) {
    if ($event.keyCode === 13) {
      this.submitForm();
    }
  }

  async submitForm() {
    this.isSubmitted = true;
    var login = this.loginForm.value.login;
    var pass = this.loginForm.value.pass;

    this.isLoading = true;
    this.loginService
      .login({ login, pass })
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.router.navigate(['/login']);
        }
      );

  }

}
