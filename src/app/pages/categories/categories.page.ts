import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController} from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any = [];
  showLoader = false;
  showModal = false;

  editCategory: {
    name: string;
    active: number;
    id: number;
  } = {
    name: '',
    active: 0,
    id: 0
  };

  errors: any = [];

  constructor(private general: GeneralService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.general.$categoryAdded.subscribe((data: any) => {
      this.get();
    });
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.showLoader = true;
    this.general.getCategories().subscribe((data: any) => {
      if(data.code === 1) {
        this.categories = data.data;
      }
      this.showLoader = false;
    }, err => {
      this.showLoader = true;
    });
  }

  async delete(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'هل تريد حذف هذا التصنيف؟',
      buttons: [
        {
          text: 'إلغاء',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'تأكيد الحذف',
          role: 'confirm',
          handler: () => {
            this.general.deleteCategory(id).subscribe((data: any) => {
              if(data.code === 1) {
                this.get();
              }
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  openModal(id: number) {
    this.errors = [];
    // editCategory
    this.general.showCategory(id).subscribe((data: any) => {
      if(data.code === 1) {
        this.editCategory = data.data;
        this.showModal = true;
      }
    }, err => {
      this.showModal = false;
    });
  }

  async updateCategory() {
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    await loading.present();
    this.general.updateCategory(this.editCategory, this.editCategory.id).subscribe(async (data: any) => {
      if(data.code === 1) {
        const alert = await this.alertCtrl.create({
          header: 'شكراً لك',
          message: 'تم تعديل التصنيف بنجاح',
          buttons: ['تم'],
        });
        this.general.$categoryAdded.emit(data);
        await alert.present();
        this.showModal = false;
      } else {
        this.errors = data.messages;
      }
      await loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

}
