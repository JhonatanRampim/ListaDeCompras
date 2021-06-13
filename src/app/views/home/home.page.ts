import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ListasService } from 'src/app/services/listas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public myLists: Array<any>
  constructor(private activatedRoute: ActivatedRoute, private menu: MenuController, public listasService: ListasService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getLists();
  }

  getLists() {
    this.listasService.getMyLists().subscribe(myLists => {
      console.log(myLists);
    });
  }

}
