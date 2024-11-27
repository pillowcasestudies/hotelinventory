import {RouterStateSnapshot, CanActivate, UrlTree, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import {Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Comments } from '../comment';
import { CommentService } from '../comment.service';

    @Injectable({
        providedIn: 'root'
    })


export class CommentGuard implements Resolve<Comments[]> {
    
    constructor(private commentService: CommentService) {}
    
        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Comments[]> | Promise<Comments[]> | Comments[]
        {
            return this.commentService.getComments();
        }   
}

