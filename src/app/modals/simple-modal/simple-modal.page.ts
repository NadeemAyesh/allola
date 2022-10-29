import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.page.html',
  styleUrls: ['./simple-modal.page.scss'],
})
export class SimpleModalPage implements OnInit {

  user = {
    mobile: '',
    password: '',
    username: '',
    type: '',
    active: false
  };

  errors: any = [];

  constructor(private general: GeneralService, private loadingCtrl: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
  }

  async addUser() {
    this.user.active = this.user.active ? this.user.active : false;
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    loading.present();
    this.general.addUser(this.user).subscribe(async (data: any) => {
      // console.log(data);
      if(data.code === 1) {
        const alert = await this.alertController.create({
          header: 'شكراً لك',
          message: 'تم إضافة المستخدم بنجاح',
          buttons: ['تم'],
        });

        alert.present();
        this.general.$userAdded.emit(data);
      } else {
        this.errors = data.messages;
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

}
