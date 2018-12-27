import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';
@Component({
  selector: 'app-new-building',
  templateUrl: './new-building.component.html',
  styleUrls: ['./new-building.component.css']
})
export class NewBuildingComponent implements OnInit {
  errorHeadersStatus: Subscription;
  errorClass: boolean;
  nameInvalid: string;

  newBuilding = new FormGroup({
    nameBuilding: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  constructor(private storageData: StorageDataService, private router: Router) { }



  ngOnInit() {

    // this.errorHeadersStatus = this.storageData.errorHeadersStatus;
    this.errorHeadersStatus = this.storageData.checkHeadersError()
    .subscribe((status: any) => {
      this.errorHeadersStatus = status;
      // console.log(this.errorHeadersStatus);
      if (status === 500) {
        this.nameInvalid = this.newBuilding.value.nameBuilding;
        this.errorClass = true;
        console.log(this.nameInvalid, this.newBuilding.value.nameBuilding);
      }

      if (status === 200) {
          this.router.navigate(['/dashboard/buildings']);
      }

    });
  }


  onSubmit() {

    // mat-form-field-invalid
    // this.isLoading = true;
    const name = this.newBuilding.value.nameBuilding;
    const address = this.newBuilding.value.address;
    const info = this.newBuilding.value.info;
    this.storageData.createNewBuilding(name, address, info);
    this.storageData.loadBuildings();
  }
}
