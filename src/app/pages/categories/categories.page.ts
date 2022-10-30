import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: any = [];
  showLoader = false;

  constructor(private general: GeneralService, private alertCtrl: AlertController) {
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

}
