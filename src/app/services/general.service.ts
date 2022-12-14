import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  token = '';

  $userAdded: EventEmitter<any> = new EventEmitter();
  $itemAdded: EventEmitter<any> = new EventEmitter();
  $itemDeleted: EventEmitter<any> = new EventEmitter();
  $categoryAdded: EventEmitter<any> = new EventEmitter();
  $colorAdded: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.token = JSON.parse(this.cookie.get('user')).token;

  }

  // ?page=1
  getUsers(page?: number) {
    const headers = new HttpHeaders().set('token', this.token);
    if(page) {
      return this.http.get(environment.base + '/' + environment.users + '?page=' + page, {
        headers
      });
    } else {
      return this.http.get(environment.base + '/' + environment.users + '?page=1', {
        headers
      });
    }
  }

  addUser(user: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.users + '/' + environment.add, user, { headers });
  }

  updateUser(user: any, id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.users + '/' + environment.update + '/' + id, user, { headers });
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.users + '/' + environment.delete + '/' + id, { }, { headers });
  }

  showUser(id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.users + '/' + environment.show + '/' + id, { headers });
  }

  showItem(id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.items + '/' + environment.show + '/' + id, { headers });
  }

  showItemAsIds(id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.items + '/' + environment.show, { headers });
  }

  showCategory(id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.categories + '/' + environment.show + '/' + id, { headers });
  }

  showColor(id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.colors + '/' + environment.show + '/' + id, { headers });
  }

  getItems(page?: number) {
    const headers = new HttpHeaders().set('token', this.token);
    if(page) {
      return this.http.get(environment.base + '/' + environment.items + '?page=' + page, {
        headers
      });
    } else {
      return this.http.get(environment.base + '/' + environment.items + '?page=1', {
        headers
      });
    }
  }

  getCategories() {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.categories + '/' + environment.all, {
      headers
    });
  }

  getColors() {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.colors + '/' + environment.all, {
      headers
    });
  }

  getModels() {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.models + '/' + environment.all, {
      headers
    });
  }

  search(category: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(environment.base + '/' + environment.items + '/' + environment.all + '?category=' + category, {
      headers
    });
  }

  addItem(item: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.items + '/' + environment.add, item, { headers });
  }

  updateItem(item: any, id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.items + '/' + environment.update + '/' + id, item, { headers });
  }

  updateCategory(item: any, id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.categories + '/' + environment.update + '/' + id, item, { headers });
  }

  updateColor(item: any, id: number) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.colors + '/' + environment.update + '/' + id, item, { headers });
  }

  deleteItem(itemId: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.items + '/' + environment.delete + '/' + itemId, {}, { headers });
  }

  deleteCategory(catId: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.categories + '/' + environment.delete + '/' + catId, {}, { headers });
  }

  deleteColor(catId: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.colors + '/' + environment.delete + '/' + catId, {}, { headers });
  }

  addCategory(item: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.categories + '/' + environment.add, item, { headers });
  }

  addColor(item: any) {
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(environment.base + '/' + environment.colors + '/' + environment.add, item, { headers });
  }


}
