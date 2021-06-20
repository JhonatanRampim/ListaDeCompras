import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';
import { ListaPage } from '../modals/lista/lista.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public myLists: Array<any>
  constructor(private activatedRoute: ActivatedRoute,
    private menu: MenuController,
    public listasService: ListasService,
    public modalController: ModalController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading()
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getLists();
  }

  getLists() {
    return this.listasService.getMyLists().subscribe(response => {
      this.loadingController.dismiss();
      this.myLists = response.data;
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
  }

  async modalProtetiva(id?, nome?) {
    const modal = await this.modalController.create({
      component: ListaPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'id_lista': id,
        'nome_lista': nome,
      }
    });
    return await modal.present();
  }

  openList(id?, nome?) {
    this.modalProtetiva(id, nome);
  }

}
