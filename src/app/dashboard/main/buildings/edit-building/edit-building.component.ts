import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StorageDataService } from 'src/app/shared/storage-data.service';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})
export class EditBuildingComponent implements OnInit {

  constructor(private storageData: StorageDataService) { }
  @Input() building: any;
  errorClass: boolean;
  nameInvalid: string;

  editBuilding = new FormGroup({
    nameBuilding: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  ngOnInit() {
  }
  onSubmit() {


    console.log('we', this.building);
    // mat-form-field-invalid
    // this.isLoading = true;
    // const name = this.editBuilding.value.nameBuilding;
    // const address = this.editBuilding.value.address;
    // const info = this.editBuilding.value.info;
    // this.storageData.createNewBuilding(name, address, info);
    // this.storageData.loadBuildings();
  }
}
