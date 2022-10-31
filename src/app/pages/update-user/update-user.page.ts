import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  user = {
    mobile: '',
    password: '',
    username: '',
    type: '',
    active: false
  };

  errors: any = [];
  id: number;

  constructor(private general: GeneralService, private loadingCtrl: LoadingController, private alertController: AlertController, private router: ActivatedRoute) {
    this.id = this.router.snapshot.params['id'];
    // console.log(id);
    this.general.showUser(this.id).subscribe((data: any) => {
      if(data.code === 1) {
        this.user = data.data;
      }
    });
  }

  ngOnInit() {

  }

  async addUser(myForm: NgForm) {
    this.user.active = this.user.active ? this.user.active : false;
    const loading = await this.loadingCtrl.create({
      message: '',
    });
    loading.present();
    this.general.updateUser(this.user, this.id).subscribe(async (data: any) => {
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
