import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as roomsAction from '../../rooms/store/rooms.actions';
import * as reportsAction from '../../reports/store/reports.actions';
import {AppState} from '../../../../reducers/index';
import * as customersAction from '../store/customers.actions';

import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  faVenus = faVenus;
  faMars = faMars;
  idRoom: string;
  idCustomer: string;
  reloadBuildings: Object;
  reloadRooms: Object;
  @Input() room: any;

  newCustomer = new FormGroup({
    idCustomer: new FormControl(this.route.snapshot.params['idCustomer'], [Validators.required]),
    idRoom: new FormControl('test', [Validators.required]),
    idBuilding: new FormControl('test', [Validators.required]),
    namePayment: new FormControl(null, [Validators.required]),
    now: new FormControl(new Date(), Validators.required),
    from: new FormControl(new Date(), Validators.required),
    to: new FormControl(new Date(), Validators.required),
    amount: new FormControl( null, Validators.required),
    deposit: new FormControl( null),
    info: new FormControl( null),
    type: new FormControl( 'checkin', Validators.required),
    paymentType: new FormControl(null, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {

    this.store.dispatch(new customersAction.LoadingCustomers());

    this.idRoom = this.route.snapshot.params['idRoom'];
    // this.idBuilding = this.route.snapshot.params['idBuilding'];

    this.store.select(appState => appState).subscribe(
      appState => {
        this.reloadRooms = appState.rooms.ids[0];
        // this.findIdBuilding();
      }
    );

    if (!this.reloadRooms) {
      this.store.dispatch(new roomsAction.LoadingRooms());
    }

    // if (this.idBuilding.length === 9) {
    //   this.findIdBuilding();
    // }
  }

  onSubmit(newCustomer: FormGroup) {
    this.store.select<AppState[]>('customers');
    this.store.dispatch(new reportsAction.AddReport(newCustomer.value));
  }
  // findIdBuilding() {
  //   this.store.select(roomsState => roomsState).subscribe(
  //         roomsState => this.idBuilding = roomsState.rooms.entities[this.idRoom].idBuilding
  //   );
  // }

}


