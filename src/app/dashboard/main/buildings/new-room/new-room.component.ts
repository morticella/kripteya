import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { Room } from 'src/app/shared/models/room.model';



@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  errorHeadersStatus: Subscription;
  errorClass: boolean;
  nameInvalid: string;
  newRoom: FormGroup;
  @Input() building: any;
  // view: any;


  constructor(private storageData: StorageDataService, private router: Router) { }



  ngOnInit() {

    this.newRoom = new FormGroup({
      nameBuilding: new FormControl(this.building.nameBuilding, [Validators.required]),
      name: new FormControl(null, Validators.required),
      beds: new FormControl( null, Validators.required),
      gender: new FormControl( true, Validators.required),
      rent: new FormControl( null, Validators.required),
      deposit: new FormControl( null, Validators.required),
      notice: new FormControl( null),
      booked: new FormControl( null),
    });


    // this.errorHeadersStatus = this.storageData.errorHeadersStatus;


  }


  onSubmit() {
    // console.log(this.newRoom);
    this.storageData.createNewRoom(this.newRoom);
    // this.storageData.loadRooms();
  }

}
