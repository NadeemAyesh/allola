import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { ItemComponent } from '../components/item/item.component';
import { NotifyComponent } from '../components/notify/notify.component';


@NgModule({
  declarations: [HeaderComponent, ItemComponent, NotifyComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [HeaderComponent, ItemComponent, NotifyComponent]
})
export class SharedModule { }
