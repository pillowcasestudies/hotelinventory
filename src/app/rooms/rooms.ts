export interface Room {
    availableRooms:number;
    bookedRooms:number;
    totalRooms:number;
    hideRooms:boolean;
    
}

export interface RoomList{
    roomNumber? : string; 
    roomType : string; 
    amenities: string; 
    price : number; 
    rating: number;
    photos: string;
checkinTime: Date;
checkoutTime: Date;
    
}