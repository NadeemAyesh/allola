import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddColorPageRoutingModule } from './add-color-routing.module';

import { AddColorPage } from './add-color.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddColorPageRoutingModule
  ],
  declarations: [AddColorPage]
})
export class AddColorPageModule {}
