import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/reducers';
import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as roomsAction from '../store/rooms.actions';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private store: Store<AppState>) { }

    room: any;
    emergencyReload$: any;
    roomsState$: Observable<AppState>;
    buildingsState$: Observable<AppState>;
    building: any;
    rooms: any;
    name: string;
    gender: boolean;
    idRoom: string;
    beds: number;
    deposit: number;
    rent: number;
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
    this.roomsState$ = this.store.select<AppState>('rooms');
    this.buildingsState$ = this.store.select<AppState>('buildings');
    this.room = this.roomsState$;
    this.building = this.buildingsState$;

    this.emergencyReload$ = this.store.select(appState => appState).subscribe(
      appState => {
        this.reloadBuildings = appState.buildings.ids[0];
        this.reloadRooms = appState.rooms.ids[0];
      }
    );
    if (!this.reloadRooms) {
      this.store.dispatch(new roomsAction.LoadingRooms());
    }
    if (!this.reloadBuildings) {
      this.store.dispatch(new buildingsAction.LoadingBuildings());
    }
  }

  onSubmit(editRoom: FormGroup) {
    this.store.dispatch(new roomsAction.EditRoom(editRoom));
  }
  ngOnDestroy() {
    this.emergencyReload$.unsubscribe();
  }
}

