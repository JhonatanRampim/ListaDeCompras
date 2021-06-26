import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Item } from 'src/app/models/lista.model';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-usar-lista',
  templateUrl: './usar-lista.page.html',
  styleUrls: ['./usar-lista.page.scss'],
})
export class UsarListaPage implements OnInit {
  listaId: number;
  itens: Array<Item>;
  listsItens: any;
  showUserTotalValue: number;
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

  showUserTotal() {
    var total: number = 0.00
    this.itens = this.itens.map(element => {
      element.total = 0.00
      if (element.isChecked == false)
        element.valor = 0.00;
      element.total = (element.valor) ? element.valor * element.quantidade : 0.00;
      total += element.total
      console.log(element.total);
      return element
    });
 
  }

  onSubmit() {
    this.isLoading = true;
    var total: number = 0.00
    this.itens = this.itens.map(element => {
      element.total = 0.00
      if (element.isChecked == false)
        element.valor = 0.00;
      element.total = (element.valor) ? element.valor * element.quantidade : 0.00;
      total += element.total
      return element
    });

    const dataToSent = {
      id_lista: this.listaId,
      itens: this.itens,
      total: total.toFixed(2)
    }
    console.log(dataToSent);
    this.listaService.checkList(dataToSent).subscribe(data => {
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
