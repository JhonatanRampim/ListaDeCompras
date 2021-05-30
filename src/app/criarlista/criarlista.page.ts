import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Item } from '../models/lista.model';


@Component({
  selector: 'app-criarlista',
  templateUrl: './criarlista.page.html',
  styleUrls: ['./criarlista.page.scss'],
})
export class CriarlistaPage implements OnInit {
  itemForm: FormGroup;
  userInfo: any = [];
  route: Router;
  isLoading: boolean = false;
  lista: Array<Item> = [];
  constructor(
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
    });
  }
  get f() {
    return this.itemForm.controls;
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      alert('you just pressed the enter key');
      // rest of your code
    }
  }
  EnterSubmit($event) {
    if ($event.keyCode === 13) {
      this.includeItem();
    }
  }

  includeItem() {
    this.lista.push({
      nomeItem: this.itemForm.controls.nome.value.toUpperCase(),
      quantidade: this.itemForm.controls.quantidade.value
    });
  }
  excludeItem(i) {
    this.lista.splice(i, 1);
  }

}
