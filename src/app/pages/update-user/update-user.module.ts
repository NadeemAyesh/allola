import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserPageRoutingModule } from './update-user-routing.module';

import { UpdateUserPage } from './update-user.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserPageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateUserPage]
})
export class UpdateUserPageModule {}
