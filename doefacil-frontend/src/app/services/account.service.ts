import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../utils/url-api';


export interface Me {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private base = `${URL_API}/api/me`;

  constructor(private http: HttpClient) { }

  getMe() {return this.http.get<Me>(this.base)}

  updateName(name: string) { return this.http.patch<Me>(this.base, { name }); }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<void>(`${this.base}/change-password`, { currentPassword, newPassword });
  }

}
