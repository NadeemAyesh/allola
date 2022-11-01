import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.page.html',
  styleUrls: ['./single-item.page.scss'],
})
export class SingleItemPage implements OnInit {

  item: {
    id: number;
    model: string;
    color: string;
    size: string;
    code: string;
    category: string;
  };

  constructor(private general: GeneralService, private router: ActivatedRoute, private loadingCtrl: LoadingController, private alertController: AlertController, private routing: Router) {
    const id = this.router.snapshot.params['id'];
    this.get(id);
  }

  ngOnInit() {
  }

  async get(id: number) {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.general.showItem(id).subscribe((data: any) => {
      if (data.code === 1) {
        this.item = data.data;
        loading.dismiss();
      }
    }, err => {

    });
  }

  async deleteItem() {
    const alert = await this.alertController.create({
      header: 'هل تريد حذف هذا العنصر؟',
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
            this.general.deleteItem(this.item.id).subscribe((data: any) => {
              if(data.code === 1) {
                this.general.$itemDeleted.emit(data);
                this.routing.navigateByUrl('/items');
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
