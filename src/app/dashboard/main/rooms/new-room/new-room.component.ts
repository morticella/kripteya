import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRooms from '../../../../reducers/index';
import * as roomsAction from '../store/rooms.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

import { StateService } from '../../../../service/state.service';


@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  idBuilding: string;
  nameBuilding: string;
  allowedActionControl$: any;

  newRoom = new FormGroup({
    idBuilding: new FormControl(this.route.snapshot.params['idBuilding'], [Validators.required]),
    name: new FormControl(null, Validators.required),
    beds: new FormControl( null, Validators.required),
    gender: new FormControl( true, Validators.required),
    rent: new FormControl( null, Validators.required),
    deposit: new FormControl( null, Validators.required),

  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRooms.AppState>,
    private stateService: StateService) { }

  ngOnInit() {
    this.idBuilding = this.route.snapshot.params['idBuilding'];
    this.stateService.reloadControl();
    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
      appState => {
        if (appState.buildings.ids[0]) {
          this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
        }
      }
    );
  }

  onSubmit(newRoom: FormGroup) {
    this.store.dispatch(new roomsAction.AddRoom(newRoom.value));
  }
  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}
