import { Component, QueryList, ViewChild, ViewChildren, ViewContainerRef, ElementRef, OnInit, AfterViewInit, createComponent, Optional, Inject } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [],
})


export class AppComponent  implements OnInit {
    
    [x: string]: any;
    constructor(@Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router:Router
    ) {
        
        console.log(initService.config);
        
    };
 @ViewChild('name', {static:true}) name!: ElementRef;

    ngOnInit(): void {
      
 //   this.router.events.subscribe((event) => {
  //  console.log(event + "LOADING EVENT");
  //  });
    
 this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe((event) => {
            console.log('Navigation Started', event);
        });

    // Listening for NavigationEnd
    this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
            console.log('Navigation Ended', event);
        });
    
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = "Hilton Hotel";
    this.localStorage.setItem('name', 'Hilton Hotel');
   }

  
  

}

