import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  errors: any = [];
  item = {
    name: '',
    active: 'active'
  };

  constructor(private general: GeneralService, private loadingContrl: LoadingController, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async addCategory() {
    const loading = await this.loadingContrl.create();
    loading.present();

    this.general.addCategory(this.item).subscribe(async (data: any) => {
      if(data.code === 1) {
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'شكراً لك.',
          message: 'تم إضافة التصنيف بنجاح',
          buttons: ['تم']
        });
        alert.present();
        this.general.$categoryAdded.emit(data);
      }
      loading.dismiss();

    }, error => {
      loading.dismiss();
    });
  }

}
