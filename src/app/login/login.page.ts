import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { slideInOutAnimation } from '../animation';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginObj: { mobile: string; password: string } = {
    mobile: '012541238',
    password: '001225441'
  };

  errors: {
    name: string;
    message: string;
  }[] = [];

  constructor(private router: Router, private auth: AuthService, private cookie: CookieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  slideToggle(div: string) {
    document.querySelectorAll('.login-form:not(#' + div + ')').forEach((item) => {
      item.classList.remove('slideIn');
    });
    setTimeout(() => {
      document.getElementById(div).classList.add('slideIn');
    }, 500);
  }

  async login() {
    const loading = await this.loadingCtrl.create({
      message: '',
    });

    loading.present();

    this.auth.doLogin(this.loginObj).subscribe((data: any) => {
      console.log(data);
      if(data.code == 0) {
        this.errors = data.messages;
        loading.dismiss();
      } else {
        this.cookie.set('user', JSON.stringify(data.data));
        loading.dismiss();
        this.router.navigate(['/home']);
        this.auth.confirmLogin.emit(data.data);
      }
    }, err => {
      loading.dismiss();
    });
  }


}
