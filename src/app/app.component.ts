import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;

  constructor( private cookie: CookieService, private auth: AuthService) {
    if(this.cookie.check('user')) {

      this.user = JSON.parse(this.cookie.get('user') as string);
    }

    this.auth.confirmLogin.subscribe((data: any) => {
      this.user = JSON.parse(this.cookie.get('user') as string);
    });
  }
}
