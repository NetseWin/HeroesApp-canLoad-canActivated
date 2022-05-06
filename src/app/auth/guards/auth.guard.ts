import { Injectable, Pipe } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificarAutenticacion()
    .pipe(
      tap(response => {
          if(!response){
            this.router.navigate(['/auth/login'])
          }
      })
    )

    // if (!this.authService.auth.id) {
    //   console.log('Bloqueado por AuthGuard-CanActivate');
    //   return false;
    // }

    // return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> |  boolean {

    return this.authService.verificarAutenticacion()
    .pipe(
      tap(response => {
          if(!response){
            this.router.navigate(['/auth/login'])
          }
      })
    )



      // if (!this.authService.auth.id) {
      //   console.log('Bloqueado por AuthGuard-CanLoad');
      //   return false;
      // }
      // return true;
  }
}
