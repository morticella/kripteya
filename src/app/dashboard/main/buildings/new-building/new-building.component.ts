import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import * as fromBuildings from '../store/building-list.reducer';
import * as buildingsAction from '../store/building-list.actions';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { Store } from '@ngrx/store';
// import { StateBuildings } from 'src/app/shared/models/stateBuildings.model';
@Component({
  selector: 'app-new-building',
  templateUrl: './new-building.component.html',
  styleUrls: ['./new-building.component.css']
})
export class NewBuildingComponent implements OnInit {
  // errorHeadersStatus: Subscription;
  // errorClass: boolean;
  // nameInvalid: string;
  // payload: any;
  // view: any;
  // stateBuildings: StateBuildings;
  // storeBuildings: any;

  newBuilding = new FormGroup({
    nameBuilding: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  constructor(
    private storageData: StorageDataService,
    private router: Router,
    private store: Store<fromBuildings.AppState>,
    ) { }

    errors$: Observable<fromBuildings.AppState[]>;

  ngOnInit() {

    this.errors$ = this.store.select<fromBuildings.AppState[]>('statusList');
  }

  onSubmit(buildingData: FormGroup) {
    this.store.select<fromBuildings.AppState[]>('statusList');
        // this.store.dispatch(new buildingsAction.AddBuildingFailed(false));
        this.store.dispatch(new buildingsAction.AddBuilding(buildingData.value));
  }
}


// data =>
      // this.payload = this.newBuilding.value;
      // console.log(data.value);

      // this.store.dispatch(new buildingsAction.AddBuilding(data.value));



      // this.errorHeadersStatus = this.storageData.checkHeadersError()
      // .subscribe((status: any) => {
      //   // this.storageData.tabIndex = 0;
      //   this.errorHeadersStatus = status;
      //   // console.log(this.errorHeadersStatus);
      //   if (status === 500) {
      //     this.nameInvalid = this.newBuilding.value.nameBuilding;
      //     this.errorClass = true;
      //     // this.storageData.tabIndex = 1;
      //     // console.log(this.nameInvalid, this.newBuilding.value.nameBuilding);
      //   }

      //   if (status === 200) {
      //       // this.router.navigate(['/dashboard/buildings']);
      //       this.storageData.loadBuildings();
      //       this.storageData.changeView(1);
      //       // this.storageData.tabIndex = 0;
      //       this.router.navigate(['dashboard/buildings']);
      //       // console.log('this view', this.storageData.tabIndex);
      //   }

      // });


      // this.storageData.tabIndex = undefined;
      // const name = this.newBuilding.value.nameBuilding;
      // const address = this.newBuilding.value.address;
      // const info = this.newBuilding.value.info;
      // this.storageData.createNewBuilding(name, address, info);
      // this.storageData.loadBuildings();
