import { Injectable } from '@angular/core';
import { CanActivateChildFn, CanLoad, Route, RouterStateSnapshot, UrlTree, CanActivate, ActivatedRouteSnapshot, UrlSegment, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root'
})

export class RoomGuard implements CanActivateChild {
    
    constructor(private loginService:LoginService) {

    }

    canActivateChild(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    return this.loginService.isAdmin;
    }

    
    
}
