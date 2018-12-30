import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
@Component({
  selector: 'app-new-building',
  templateUrl: './new-building.component.html',
  styleUrls: ['./new-building.component.css']
})
export class NewBuildingComponent implements OnInit, OnDestroy {
  errorHeadersStatus: Subscription;
  errorClass: boolean;
  nameInvalid: string;

  // view: any;

  newBuilding = new FormGroup({
    nameBuilding: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  constructor(private storageData: StorageDataService, private router: Router) { }



  ngOnInit() {

    // this.errorHeadersStatus = this.storageData.errorHeadersStatus;


  }


  onSubmit() {

    this.errorHeadersStatus = this.storageData.checkHeadersError()
    .subscribe((status: any) => {
      // this.storageData.tabIndex = 0;
      this.errorHeadersStatus = status;
      // console.log(this.errorHeadersStatus);
      if (status === 500) {
        this.nameInvalid = this.newBuilding.value.nameBuilding;
        this.errorClass = true;
        this.storageData.tabIndex = 1;
        // console.log(this.nameInvalid, this.newBuilding.value.nameBuilding);
      }

      if (status === 200) {
          // this.router.navigate(['/dashboard/buildings']);
          this.storageData.loadBuildings();
          this.storageData.changeView(1);
          this.storageData.tabIndex = 0;
          console.log('this view', this.storageData.tabIndex);
      }

    });

    // mat-form-field-invalid
    // this.isLoading = true;
    this.storageData.tabIndex = undefined;
    const name = this.newBuilding.value.nameBuilding;
    const address = this.newBuilding.value.address;
    const info = this.newBuilding.value.info;
    this.storageData.createNewBuilding(name, address, info);
    this.storageData.loadBuildings();
    this.router.navigate(['dashboard/buildings']);
  }

  ngOnDestroy() {
    // this.errorHeadersStatus.unsubscribe();
  }
}
