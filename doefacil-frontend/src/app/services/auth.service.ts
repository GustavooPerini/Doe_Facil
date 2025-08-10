import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { URL_API } from '../utils/url-api';
import { AuthResponse } from '../models/AuthResponse';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthRequest } from '../models/AuthRequest';


const LS_KEY = 'auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = URL_API;
  private _auth$ = new BehaviorSubject<AuthResponse | null>(this.readLS());
  auth$ = this._auth$.asObservable();

  constructor(private http: HttpClient) {}

  register(body: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.base}/auth/register`, body)
      .pipe(tap(res => this.setAuth(res)));
  }

  login(body: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.base}/auth/login`, body)
      .pipe(tap(res => this.setAuth(res)));
  }

  logout() {
    localStorage.removeItem(LS_KEY);
    this._auth$.next(null);
  }

  get token(): string | null { return this._auth$.value?.token ?? null; }
  get isLoggedIn(): boolean { return !!this.token; }
  get currentUser() { return this._auth$.value; }

  private setAuth(res: AuthResponse) {
    localStorage.setItem(LS_KEY, JSON.stringify(res));
    this._auth$.next(res);
  }
  private readLS(): AuthResponse | null {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch { return null; }
  }
}
