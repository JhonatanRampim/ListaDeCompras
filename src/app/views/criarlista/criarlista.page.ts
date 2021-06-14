import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';
import { Item } from '../../models/lista.model';


@Component({
  selector: 'app-criarlista',
  templateUrl: './criarlista.page.html',
  styleUrls: ['./criarlista.page.scss'],
})
export class CriarlistaPage implements OnInit {
  itemForm: FormGroup;
  listaForm: FormGroup;
  userInfo: any = [];
  route: Router;
  isLoading: boolean = false;
  lista: Array<Item> = [];
  listas: Array<any> = [];
  constructor(
    private menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    private router: Router,
    private listaService: ListasService,
  ) {

  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
    });
    this.listaForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['']
    })
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
  //TO:DO enviar para API
  submitList() {

    this.listas.push({
      nome_lista: this.listaForm.controls.nome.value,
      descricao: this.listaForm.controls.descricao.value,
      items: this.lista
    });

    this.listaService.createList(this.listas).subscribe(data => console.log(data));
  }

}
