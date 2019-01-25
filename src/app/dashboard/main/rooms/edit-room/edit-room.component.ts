import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import * as roomsAction from '../store/rooms.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';


import { StateService } from '../../../../service/state.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private stateService: StateService) { }

    roomsState$: Object;
    nameBuilding: string;
    gender: boolean;
    faVenus = faVenus;
    faMars = faMars;
    allowedActionControl$: any;

    editRoom = new FormGroup({
      name: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      id: new FormControl( this.route.snapshot.params['idRoom']),
      idBuilding: new FormControl( null, Validators.required),
      beds: new FormControl( null, Validators.required ),
      rent: new FormControl( null, Validators.required ),
      deposit: new FormControl( null, Validators.required  ),
    });

  ngOnInit() {

    this.roomsState$ = this.stateService.roomsState$;

    this.allowedActionControl$ = this.stateService.allowedActionControl$.subscribe(
     appState => {
       const id = this.route.snapshot.params['idRoom'];
       if (appState.rooms.ids[0] && appState.buildings.ids[0]) {
          this.editRoom.get('id').setValue(id);
          this.editRoom.get('name').setValue(appState.rooms.entities[id].name);
          this.editRoom.get('gender').setValue(appState.rooms.entities[id].gender);
          this.gender = appState.rooms.entities[id].gender;
          this.editRoom.get('beds').setValue(appState.rooms.entities[id].beds);
          this.editRoom.get('rent').setValue(appState.rooms.entities[id].rent);
          this.editRoom.get('deposit').setValue(appState.rooms.entities[id].deposit);
          this.editRoom.get('idBuilding').setValue(appState.rooms.entities[id].idBuilding);
          this.nameBuilding = appState.buildings.entities[appState.rooms.entities[id].idBuilding].nameBuilding;
       }
     }
    );

    this.stateService.reloadControl();

  }

  onSubmit(editRoom: FormGroup) {
    this.store.dispatch(new roomsAction.EditRoom(editRoom));
  }
  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}

