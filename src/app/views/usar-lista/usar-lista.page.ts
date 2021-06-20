import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  constructor(private router: ActivatedRoute, private listaService: ListasService, private loadingController: LoadingController) { }

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
}
