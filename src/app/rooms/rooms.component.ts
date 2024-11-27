import { Component, OnInit, DoCheck, ViewChild, AfterViewInit, AfterViewChecked, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { HttpEventType } from '@angular/common/http';
import { Observable, Subscription, catchError, of, Subject, map } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy {

 

stream = new Observable((observer: any) => {
  observer.next('user1');
    observer.next('user2');
      observer.next('user3');
        observer.next('user4');
        observer.complete();
        observer.error('error');
});

title = 'Room List';
  subscription = new Subscription();  // Correct instantiation
  error$ = new Subject();  // Correct instantiation
  getError$ = new Subject();
  
    ngAfterViewChecked(): void {
   
        this.headerComponent.title = "Rooms View";
       this.headerChildrenComponent.last.title = "Last Title";
    }
    ngAfterViewInit(): void {
        this.title = "rooms view"; 

    }
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        throw new Error("Method not implemented.");
    }

hotelName = 'Hilton Hotel';
hideRooms = true;


numberOfRooms = 10;

rooms : Room = {
  hideRooms:false,
  availableRooms:10,
  bookedRooms:5,
  totalRooms:20
};

roomList : RoomList[] = [ ];




@ViewChild(HeaderComponent, {static: true}) headerComponent!: HeaderComponent;

@ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;
  selectedRoom!: RoomList; 
  
  error: string = '';
  
  totalBytes = 0;
  

rooms$ = this.roomsService.getRooms$.pipe(
  catchError((err: any) => {
 //   console.log(err);
    this.error$.next(err.message);
    return of([]);  // This is inside the catchError function block
  })
);


priceFilter = new FormControl(0)

roomsCount$ = this.roomsService.getRooms$.pipe(
  map((rooms) => rooms.length)
  );

  constructor(private roomsService: RoomsService, private configService: ConfigService) { 
    

    
  }

  ngOnInit(): void {

 
      
    this.roomsService.getPhotos().subscribe((event:any) => {
     switch (event.type) {
       case HttpEventType.Sent:{
       console.log('Request has been made!');
       break;
     }
     case HttpEventType.ResponseHeader: {
       console.log('request Success')
       break
     }
     
     case HttpEventType.DownloadProgress: {
       this.totalBytes+= event.loaded;
       break
     }
     
     case HttpEventType.Response: {
       console.log(event.body);
     }
     
       
     }
    })
    
  this.stream.subscribe({
    next:(value:any) => console.log(value),
    complete:() => console.log('complete'),
    error:(err:any) => console.log(err),
  });
  this.stream.subscribe((data: any) => console.log(data));

// this.roomsService.getRooms().subscribe((rooms: RoomList[]) => {
//    this.roomList = rooms;
// });   
console.log(this.roomsService.getRooms())


    
  }
  
  
  
  ngDoCheck(){
   console.log('DoCheck is called'); 
  }
  


  
toggle()
{
  this.hideRooms = !this.hideRooms;
   this.title = "Rooms List";
}
  

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }
  
    addRoom() {
    const room: RoomList ={
    //  roomNumber: "4",
      roomType: 'DelOOX',
      amenities: 'slappin mini bar, good times, lots of yalls',
      price: 2500,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      rating: 0.2,
      checkinTime: new Date('11-nov-2021'),
      checkoutTime: new Date('12-Nov-2021')
    }
    
 //   this.roomList.push(room);
 this.roomsService.addRoom(room).subscribe((data: RoomList[]) => {
   this.roomList = data
 });
   this.roomList = [...this.roomList, room];
  
  }
  
  
  editRoom(){
        const room: RoomList ={
       roomNumber: '3',
      roomType: 'DelOOX',
      amenities: 'Editted SLOOOOOT',
      price: 2500,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      rating: 0.2,
      checkinTime: new Date('11-nov-2021'),
      checkoutTime: new Date('12-Nov-2021')
    }
    this.roomsService.editRoom(room).subscribe((data:RoomList[]) => {
      this.roomList = data;
    });
  }
  
  
  deleteRoom() {
    this.roomsService.delete('3').subscribe((data:RoomList[]) => {
      this.roomList = data;
    });
  }
  
  
      ngOnDestroy(): void {
if(this.subscription){
  this.subscription.unsubscribe();
}
    }
  
}


