import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.page.html',
  styleUrls: ['./colors.page.scss'],
})
export class ColorsPage implements OnInit {
  colors: any = [];

  constructor(private general: GeneralService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.general.$colorAdded.subscribe(data => {
      this.get();
    });
  }

  ngOnInit() {
    this.get();
  }

  async get() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    this.general.getColors().subscribe((data: any) => {
      if(data.code === 1) {
        this.colors = data.data;
      }
      loading.dismiss();
    }, err => {

    });
  }

  async delete(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'هل تريد حذف هذا اللون؟',
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
            this.general.deleteColor(id).subscribe((data: any) => {
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
