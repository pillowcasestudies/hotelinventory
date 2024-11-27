import {ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, EventEmitter, Output, OnDestroy} from '@angular/core';
import {RoomList} from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy  {
    ngOnDestroy(): void {
        console.log('on destroy called');
    }
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
       console.log(changes);
       if(changes['title']) {
           this.title = changes['title'].currentValue.toUpperCase();
       }
    }
 @Input() rooms: RoomList[] | null = [];
 
  @Input() title: string = '';
 
  @Input() price = 0;
 
 @Output() selectedRoom = new EventEmitter<RoomList>();
 
 constructor() {}
 ngOnInit(): void{
}
    
selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
}    
    
};
