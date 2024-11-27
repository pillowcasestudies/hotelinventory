import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { RoomGuard } from './rooms/guards/room.guard';

const routes: Routes = [{
  path:'',
    component: RoomsComponent, 
    canActivateChild: [RoomGuard],
  children:[
       { path: 'add', component: RoomsAddComponent},
    { path: ':id', component: RoomsBookingComponent},
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
