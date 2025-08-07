import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../utils/url-api';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }

  public createItem(item: any): Observable<any> {

    const payload = {
      ...item,
      owner: {
        id: 2
      },
      donated: false
    }

    return this.http.post(`${URL_API}/items`, payload);
  }
}
