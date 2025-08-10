import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../utils/url-api';
import { ItemCreate } from '../models/ItemCreate';
import { ItemResponse } from '../models/ItemResponse';
import { Page } from '../models/Page';
import { Category } from '../models/Category';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private base = URL_API
  constructor(private http: HttpClient) {}

  create(body: ItemCreate): Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.base}/api/items`, body);
  }

  list(page = 0, size = 12): Observable<Page<ItemResponse>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<ItemResponse>>(`${this.base}/api/items`, { params });
  }

  // Se o seu backend expõe GET /api/categories (como sugerimos), use este método
  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/api/categories`);
  }
}
