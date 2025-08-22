import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../utils/url-api';
import { Observable } from 'rxjs';
import { Page, Role, Users } from '../models/Users';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  
  private base = `${URL_API}/api/admin/users`;

  constructor(private http: HttpClient) { }

  list(page = 0, size = 20): Observable<Page<Users>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Users>>(this.base, { params });
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  updateRole(id: number, role: Role) {
    return this.http.patch<void>(`${this.base}/${id}/role`, { role });
  }
  
}
