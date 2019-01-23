import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as buildingsAction from '../../buildings/store/building-list.actions';
import * as roomsAction from '../../rooms/store/rooms.actions';
import {AppState} from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit, OnDestroy {

  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idBuilding: string;
  nameRoom: string;
  nameBuilding: string;
  reloadBuildings: Object;
  reloadRooms: Object;
  allowedActionControl$: any;
  // @Input()
  // room: any;

  newCustomer = new FormGroup({
    idRoom: new FormControl(this.route.snapshot.params['idRoom'], [Validators.required]),
    idBuilding: new FormControl(null, [Validators.required]),
    name: new FormControl(null, Validators.required),
    rent: new FormControl( null, Validators.required),
    deposit: new FormControl( null, Validators.required),
    notice: new FormControl( null),
    booked: new FormControl( null),
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {

    this.store.dispatch(new customersAction.LoadingCustomers());

    this.idRoom = this.route.snapshot.params['idRoom'];
    this.idBuilding = this.route.snapshot.params['idBuilding'];

    this.allowedActionControl$ = this.store.select(appState => appState).subscribe(
      appState => {
        this.reloadRooms = appState.rooms.ids[0];
        this.reloadBuildings = appState.buildings.ids[0];
        if (this.route.snapshot.params['idBuilding'] !== undefined) {
          if (this.reloadRooms) {
            this.idBuilding = appState.rooms.entities[this.idRoom].idBuilding;
          }
        }
        if (this.reloadBuildings && this.reloadRooms && this.idBuilding) {
          this.nameBuilding = appState.buildings.entities[this.idBuilding].nameBuilding;
          this.nameRoom = appState.rooms.entities[this.idRoom].name;
        }

      }
    );

    if (!this.reloadBuildings) {
      this.store.dispatch(new buildingsAction.LoadingBuildings());
    }

    if (!this.reloadRooms) {
      this.store.dispatch(new roomsAction.LoadingRooms());
    }

  }

  onSubmit(newCustomer: FormGroup) {
    this.store.select<AppState[]>('customers');
    this.store.dispatch(new customersAction.AddCustomer(newCustomer.value));
  }


  ngOnDestroy() {
    this.allowedActionControl$.unsubscribe();
  }
}
