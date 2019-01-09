import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { Room } from 'src/app/shared/models/room.model';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as fromRooms from '../../../../reducers/index';
import * as roomsAction from '../store/rooms.actions';


@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  errorHeadersStatus: Subscription;
  errorClass: boolean;
  nameInvalid: string;
  // newRoom: FormGroup;
  // Icons Awesome Font
  faVenus = faVenus;
  faMars = faMars;
  @Input() building: any;
  // view: any;
  newRoom = new FormGroup({
    idBuilding: new FormControl(this.route.snapshot.params['idBuilding'], [Validators.required]),
    name: new FormControl(null, Validators.required),
    beds: new FormControl( null, Validators.required),
    gender: new FormControl( true, Validators.required),
    rent: new FormControl( null, Validators.required),
    deposit: new FormControl( null, Validators.required),
    notice: new FormControl( null),
    booked: new FormControl( null),
  });

  constructor(
    // private storageData: StorageDataService,
    // private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRooms.AppState>) { }



  ngOnInit() {

    this.store.dispatch(new roomsAction.LoadingRooms());


    // this.errorHeadersStatus = this.storageData.errorHeadersStatus;


  }


  onSubmit(newRoom: FormGroup) {
    this.store.select<fromRooms.AppState[]>('rooms');
    this.store.dispatch(new roomsAction.AddRoom(newRoom.value));
    // // console.log(this.newRoom);
    // this.storageData.createNewRoom(this.newRoom);
    // // this.storageData.loadRooms();
    // this.router.navigate(['dashboard/buildings']);
  }

}
