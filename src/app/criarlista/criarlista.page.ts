import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-criarlista',
  templateUrl: './criarlista.page.html',
  styleUrls: ['./criarlista.page.scss'],
})
export class CriarlistaPage implements OnInit {
  loginForm: FormGroup;
  userInfo: any = [];
  route: Router;
  isLoading: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      alert('you just pressed the enter key');
      // rest of your code
    }
  }
  EnterSubmit($event) {
    if ($event.keyCode === 13) {
      this.submitLogin();
    }
  }

  submitLogin() {
    this.isLoading = true;
    if (this.loginForm.invalid) {
      return;
    }

  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

}
