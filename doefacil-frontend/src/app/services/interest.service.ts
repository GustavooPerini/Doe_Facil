import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InterestCreateDTO {
  itemId: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class InterestService {
  // Ajuste a base se tiver variável de ambiente (ex.: environment.apiUrl)
  private readonly base = 'http://localhost:8080/api/interests';

  constructor(private http: HttpClient) {}

  create(dto: InterestCreateDTO): Observable<number> {
    return this.http.post<number>(this.base, dto);
  }
}
