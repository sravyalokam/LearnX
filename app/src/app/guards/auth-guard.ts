import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) { }

  canActivate(): boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      return this.router.parseUrl('/signin');
    }
  }
}