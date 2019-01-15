import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import * as fromRooms from '../../../../reducers/index';
import * as roomsAction from '../store/rooms.actions';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit {

  errorHeadersStatus: Subscription;
  errorClass: boolean;
  nameInvalid: string;
  faVenus = faVenus;
  faMars = faMars;
  idBuilding: string;
  @Input() building: any;

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
    private route: ActivatedRoute,
    private store: Store<fromRooms.AppState>) { }

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    this.store.dispatch(new roomsAction.LoadingRooms());
  }

  onSubmit(newRoom: FormGroup) {
    this.store.select<fromRooms.AppState[]>('rooms');
    this.store.dispatch(new roomsAction.AddRoom(newRoom.value));
  }

}
