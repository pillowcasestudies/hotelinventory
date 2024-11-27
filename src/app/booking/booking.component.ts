import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { mergeMap, switchMap, exhaustMap } from 'rxjs/operators';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  
  bookingForm!: FormGroup;
  
  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: roomId, disabled: true },{ validators: [Validators.required]}),
      guestEmail: ['', { updateOn:'blur', validators: [Validators.required, Validators.email]}],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', {updateOn: 'blur'}],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar('*')  ]],
      guestCount: [''],
      guestList: [''],
      address: this.fb.group({  
        addressLine1: ['', {validators: [Validators.required]}],
        addressLine2: ['', {validators: [Validators.required]}],
        city: ['', {validators: [Validators.required]}],
        state: ['', {validators: [Validators.required]}],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([
       this.addGuestControl()
      ]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue]},
   ),

    },
    
    {
      updateOn: 'blur',
       validators: [CustomValidator.validatedate]
    }
    );
        this.getBookingData();
  //      this.bookingForm.valueChanges.subscribe((data) => {
  //        this.bookingService.bookRoom((data) => {});
  //      });

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.bookingService.bookRoom(data))
      ).subscribe((data) => console.log(data));
  
  }

  get guests(): FormArray {
    return this.bookingForm.get(`guests`) as FormArray;
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
  //  this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => { console.log(data)})
    
 this.bookingForm.reset({
      
   roomId: '2',
    guestEmail: '',
   checkinDate: '',
    checkoutDate: '',
   bookingStatus: '',
  bookingAmount: '',
  bookingDate: '',
     mobileNumber: '',
     guestName: '',
    guestCount: '',
    guestList: '',
   address:{
    addressLine1: '',
    addressLine2: '',
     city: '',
    state: '',
    country: '',
     zipCode: '',
   },
 guests: [],
 tnc: false, 
 });
  }


  getBookingData() {
    this.bookingForm.patchValue({    
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-feb-2020'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestCount: '',
      guestList: '',
      address:{
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false, 
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  } 
  
  deletePassport() {
    if(this.bookingForm.get('passport')){
      this.bookingForm.removeControl('passport');
    }
  }
  
  removeGuest(i:number) {
  this.guests.removeAt(i);
  }
  

  addGuest() {
    this.guests.push(this.addGuestControl());
    
  }
 
addGuestControl() {
  return this.fb.group({
    guestName: ['', {validators: [Validators.required]}],
    age: new FormControl('',  {updateOn:'blur'})
  });
}


  

  
}
