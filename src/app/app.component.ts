import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Tela Inicial', url: '/home', icon: 'home' },
    { title: 'Criar Lista', url: '/criarlista', icon: 'add-circle' },
  ];
  constructor() {}

}
