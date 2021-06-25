import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-usar-lista',
  templateUrl: './usar-lista.page.html',
  styleUrls: ['./usar-lista.page.scss'],
})
export class UsarListaPage implements OnInit {
  listaId: number;
  itens: any;
  listsItens: any;
  isLoading: boolean = false;
  constructor(private router: ActivatedRoute, private listaService: ListasService, private loadingController: LoadingController, private alertController: AlertController) { }

  async ngOnInit() {
    await this.presentLoading();
    this.router.params.subscribe(routeParams => {
      this.listaId = routeParams['id'];
      this.getMyListsItems(this.listaId)
      return routeParams
    });

  }
  getMyListsItems(listaId) {
    this.listaService.getMyListsItems(listaId).subscribe(response => {
      this.listsItens = response.data[0]
      response.data.forEach(arrayItems => {
        this.itens = arrayItems.items;
      });
      this.loadingController.dismiss('firstLoading');
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      id: 'firstLoading',
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
  }

  async presentErrorAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops! Houve um erro :(',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentSuccessAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eba! Itens salvos com Sucesso!!',
      message: 'Agora está tudo salvo conosco!',
      buttons: ['OK']
    });
    await alert.present();
  }

  onSubmit() {
    this.isLoading = true;
    this.itens = this.itens.map(element => {
      (element.is_checked == true) ? element.is_checked = 1 : element.is_checked = 0;
      element.id_lista = this.listaId;
      return element
    });
    this.listaService.checkList(this.itens).subscribe(data => {
      if (!data.success) {
        this.isLoading = false;
        return this.presentErrorAlert(data.data);
      }
      this.isLoading = false;
      return this.presentSuccessAlert();
    }, error => {
      this.isLoading = false;
      this.presentErrorAlert(error.error.data);
    })
  }
}
