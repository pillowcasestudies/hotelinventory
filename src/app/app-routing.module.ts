import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:'employee', component: EmployeeComponent, canActivate: [LoginGuard]},
  {path:'login', component: LoginComponent},
  {
    path:'rooms',
  loadChildren: () => 
  import('./rooms.module').then((m) => m.RoomsModule),
  // canActivate: [LoginGuard],
  // canLoad: [LoginGuard],
  },

  {path:'rooms', component: RoomsComponent},
  {path: 'rooms/add', component:RoomsAddComponent},
  {path:'rooms/:id', component: RoomsBookingComponent},
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  { path: 'booking/:id',
  loadChildren: () =>
  import('./booking/booking.module').then((m) => m.BookingModule)
  //, canActivate: [LoginGuard] 
  },
  { path: 'comment', loadChildren: () => import('./comment/comment.module').then(m => m.CommentModule) },
  {path:'**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
