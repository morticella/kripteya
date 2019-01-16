import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/reducers';
import * as fromRooms from '../store/rooms.reducers';
import * as fromBuildings from '../../buildings/store/building-list.reducer';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as roomsAction from '../store/rooms.actions';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private store: Store<fromRooms.RoomsState>,
    private emergencyStore: Store<AppState>) { }

    @Input() room: any;
    errorClass: boolean;
    nameInvalid: string;
    roomsState$: Observable<fromRooms.RoomsState>;
    buildingsState$: Observable<fromBuildings.BuildingsState>;
    building: any;
    rooms: any;
    idRoom: string;
    gender: boolean;
    beds: number;
    name: string;
    rent: number;
    deposit: number;
    faVenus = faVenus;
    faMars = faMars;
    reloadBuildings: Object;
    reloadRooms: Object;

    editRoom = new FormGroup({
      name: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      id: new FormControl( this.route.snapshot.params['idRoom']),
      idBuilding: new FormControl( null, Validators.required),
      beds: new FormControl( null, Validators.required ),
      deposit: new FormControl( null, Validators.required  ),
      rent: new FormControl( null, Validators.required ),
    });

  ngOnInit() {
    this.idRoom = this.route.snapshot.params['idRoom'];
    this.roomsState$ = this.store.select<fromRooms.RoomsState>('rooms');
    this.buildingsState$ = this.store.select<fromBuildings.BuildingsState>('buildings');
    this.room = this.roomsState$;
    this.building = this.buildingsState$;

    this.emergencyStore.select(appState => appState).subscribe(
      appState => {
        this.reloadBuildings = appState.buildings.ids[0];
        this.reloadRooms = appState.rooms.ids[0];
      }
    );
    if (!this.reloadBuildings) {
      this.emergencyStore.dispatch(new buildingsAction.LoadingBuildings());
    }
    if (!this.reloadRooms) {
      this.emergencyStore.dispatch(new roomsAction.LoadingRooms());
    }
  }

  onSubmit(editRoom: FormGroup) {
    this.store.dispatch(new roomsAction.EditRoom(editRoom));
  }

}

