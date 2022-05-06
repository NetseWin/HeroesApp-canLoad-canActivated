import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;

  private baseUrl: string = environment.baseUrl;

  get auth() {
    return {...this._auth}
  }

  constructor(private http: HttpClient) { }

  verificarAutenticacion(): Observable<boolean> {
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth => {
        this._auth = auth;
        return (true);
      })
    )
  }

  login():Observable<Auth>{
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(auth => this._auth = auth),
      tap(auth => localStorage.setItem('token', JSON.stringify(auth.id))),
    )
  }
}
