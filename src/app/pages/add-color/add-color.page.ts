import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.page.html',
  styleUrls: ['./add-color.page.scss'],
})
export class AddColorPage implements OnInit {

  item = {
    name: '',
    active: 'active'
  };

  errors: any = [];

  constructor(private general: GeneralService, private loadingContrl: LoadingController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addColor() {
    const loading = await this.loadingContrl.create();
    loading.present();

    this.general.addColor(this.item).subscribe(async (data: any) => {
      if(data.code === 1) {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'شكراً لك.',
          message: 'تم إضافة اللون بنجاح',
          buttons: ['تم']
        });
        alert.present();
        this.general.$colorAdded.emit(data);
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
    });
  }

}
