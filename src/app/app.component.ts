import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './models/user.model';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Tela Inicial', url: '/home', icon: 'home' },
    { title: 'Criar Lista', url: '/criarlista', icon: 'add-circle' },
  ];
  user: UserModel;
  constructor(private loginService: LoginService, private router: Router) { }
  ngOnInit() {
    this.loginService.user.subscribe(user => {
    if(user){
      this.user = user 
    } 
    });
  }
  logout() {
    this.loginService.logout().subscribe(data => {
      if (data) {
        this.router.navigate(['/login']);
      }
    });

  }
}
