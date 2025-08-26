import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../utils/url-api';

export interface InterestCreateDTO { itemId: number; message: string; }
export type InterestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface InterestView {
  id: number;
  message: string;
  requesterId: number;
  requesterName: string;
  requesterEmail: string;
  createdAt: string;
  status: InterestStatus;
}

@Injectable({ providedIn: 'root' })
export class InterestService {
  private base = `${URL_API}/api/interests`;

  constructor(private http: HttpClient) {}

  create(dto: InterestCreateDTO): Observable<number> {
    return this.http.post<number>(`${this.base}`, dto);
  }

  listByItem(itemId: number): Observable<InterestView[]> {
    return this.http.get<InterestView[]>(`${this.base}/item/${itemId}`);
  }

  decide(interestId: number, accept: boolean): Observable<void> {
    return this.http.post<void>(`${this.base}/${interestId}/decision`, null, {
      params: { accept }
    });
  }
}
