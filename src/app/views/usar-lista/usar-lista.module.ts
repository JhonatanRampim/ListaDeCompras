import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsarListaPageRoutingModule } from './usar-lista-routing.module';

import { UsarListaPage } from './usar-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsarListaPageRoutingModule
  ],
  declarations: [UsarListaPage]
})
export class UsarListaPageModule {}
