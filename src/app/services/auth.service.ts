import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  confirmLogin: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  doLogin(user: {mobile: string; password: string}) {
    return this.http.post(environment.base + '/' + environment.login, user);
  }
}
