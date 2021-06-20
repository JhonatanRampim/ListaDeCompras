import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  public ListsItems: Array<any>;
  public Items: any;
  isLoading: boolean = false;
  @Input() id_lista: string;
  @Input() nome_lista: string;
  constructor(public modalCtrl: ModalController, private listaService: ListasService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getMyListsItems();
  }
  getMyListsItems() {

    this.listaService.getMyListsItems(this.id_lista).subscribe(response => {
      this.ListsItems = response.data
      this.ListsItems.forEach(arrayItems => {
        this.Items = arrayItems.items;
      });
    });
    this.isLoading = false;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
