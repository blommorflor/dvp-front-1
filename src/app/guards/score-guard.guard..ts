import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScoreGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

    const score = parseFloat(route.paramMap.get('score') || '');

    if (score < 30) {
      this.router.navigate(['/acceso-denegado']);
      return false;
    }

    return true;
  }
}
