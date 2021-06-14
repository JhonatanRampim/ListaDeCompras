import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';
import { ListaPage } from '../lista/lista.page';

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
    public modalController: ModalController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getLists();
  }

  getLists() {
    return this.listasService.getMyLists().subscribe(response => {
      this.myLists = response.data;
    })
  }

  async modalProtetiva(id?) {
    const modal = await this.modalController.create({
      component: ListaPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'id_lista': id,
      }
    });
    return await modal.present();
  }

  openList(id?) {
    this.modalProtetiva(id);
  }

}
