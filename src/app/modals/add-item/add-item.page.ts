import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  item = {
    code: '',
    category: 0,
    color: 0,
    model: 0,
    active: 'active',
    size: '',
  };

  errors: any = [];

  categories: any = [];
  colors: any = [];
  models: any = [];

  constructor(private general: GeneralService, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getCategories();
    this.getColors();
    this.getModels();
  }

  getCategories() {
    this.general.getCategories().subscribe((data: any) => {
      if(data.code === 1) {
        this.categories = data.data;
      }
    });
  }

  getColors() {
    this.general.getColors().subscribe((data: any) => {
      if(data.code === 1) {
        this.colors = data.data;
      }
    });
  }

  getModels() {
    this.general.getModels().subscribe((data: any) => {
      if(data.code === 1) {
        this.models = data.data;
      }
    });
  }

  async addItem() {
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    loading.present();
    this.general.addItem(this.item).subscribe(async (data: any) => {
      if(data.code === 1) {
        const alert = await this.alertController.create({
          header: 'شكراً لك',
          message: 'تم إضافة المستخدم بنجاح',
          buttons: ['تم'],
        });

        alert.present();
        this.general.$itemAdded.emit(data);
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

}
