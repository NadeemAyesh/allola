import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
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

  id: number;

  constructor(private general: GeneralService, private alertController: AlertController, private loadingCtrl: LoadingController, private router: ActivatedRoute) {

    this.getCategories();
    this.getColors();
    this.getModels();

    this.id = this.router.snapshot.params['id'];
    // console.log(id);
    this.general.showItem(this.id).subscribe((data: any) => {
      if(data.code === 1) {
        this.item = data.data;
      }
    });
  }

  ngOnInit() {
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

  async updateItem() {
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    loading.present();
    this.general.updateItem(this.item, this.id).subscribe(async (data: any) => {
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
