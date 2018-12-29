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
  // buildingId: string;
  editBuilding: FormGroup;


  // editBuilding = new FormGroup({
  //   nameBuilding: new FormControl(null, [Validators.required]),
  //   address: new FormControl(null, Validators.required),
  //   info: new FormControl( null),
  // });

  ngOnInit() {

    this.editBuilding = new FormGroup({
      nameBuilding: new FormControl(this.building.nameBuilding, [Validators.required]),
      address: new FormControl(this.building.address, Validators.required),
      info: new FormControl( this.building.info),
    });

    // this.editBuilding.nameBuilding.setValue('');
    // console.log('titolo', this.building);
  }

  onSubmit(id: string) {
    // console.log('we id: ', this.editBuilding);
    // mat-form-field-invalid
    // this.isLoading = true;
    this.storageData.buildingId = id;
    this.storageData.editView = 0;
    const name = this.editBuilding.value.nameBuilding;
    const address = this.editBuilding.value.address;
    const info = this.editBuilding.value.info;
    this.storageData.editBuilding(id, name, address, info);
    this.storageData.loadBuildings();
    // this.storageData.lBuildings(id);
  }
}
