import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import * as fromRooms from '../store/rooms.reducers';
import * as roomsAction from '../store/rooms.actions';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private store: Store<fromRooms.RoomsState>,
    private router: Router) { }

    @Input() room: any;
    errorClass: boolean;
    nameInvalid: string;
    roomsState$: Observable<fromRooms.RoomsState>;
    // editRoom: FormGroup;
    rooms: any;
    idRoom: string;
    gender: boolean;
    beds: number;
    name: string;
    rent: number;
    deposit: number;
    notice: Date;
    booked: Date;
    faVenus = faVenus;
    faMars = faMars;
    // editRoom: FormGroup;
    editRoom = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl(null),
      id: new FormControl( this.route.snapshot.params['idRoom']),
      beds: new FormControl( null ),
      deposit: new FormControl( null  ),
      rent: new FormControl( null ),
      // booked: new FormControl( null ),
      // notice: new FormControl( null ),
    });

ngOnInit() {
this.idRoom = this.route.snapshot.params['idRoom'];
this.roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
this.room = this.roomsState$;

}

onSubmit(editRoom: FormGroup) {
  this.store.dispatch(new roomsAction.EditRoom(editRoom));
}

}

