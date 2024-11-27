import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from './header/header.module';
import { RouteConfigToken } from './services/routeConfig.service';
import { FilterPipe } from './rooms/filter.pipe';


@NgModule({
  declarations: [    
    RoomsComponent,
    RoomsListComponent,   
     RoomsAddComponent,
    RoomsBookingComponent,
    FilterPipe,
   ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeaderModule,
    ReactiveFormsModule
  ], 
  providers: [
  {
    provide: RouteConfigToken,
    useValue: {title: 'Room'},
  },
  ]
})
export class RoomsModule { }
