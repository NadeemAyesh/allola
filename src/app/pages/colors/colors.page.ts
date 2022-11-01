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
  showModal = false;

  editColor: {
    name: string;
    active: number;
    id: number;
  } = {
    name: '',
    active: 1,
    id: 0
  };

  errors: any = [];

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

  openModal(id: number) {
    this.errors = [];
    // editCategory
    this.general.showColor(id).subscribe((data: any) => {
      if(data.code === 1) {
        this.editColor = data.data;
        this.showModal = true;
      }
    }, err => {
      this.showModal = false;
    });
  }

  async updateColor() {
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    await loading.present();
    this.general.updateColor(this.editColor, this.editColor.id).subscribe(async (data: any) => {
      if(data.code === 1) {
        const alert = await this.alertCtrl.create({
          header: 'شكراً لك',
          message: 'تم تعديل اللون بنجاح',
          buttons: ['تم'],
        });
        this.general.$colorAdded.emit(data);
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
