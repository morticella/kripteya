import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { StorageDataService } from 'src/app/shared/storage-data.service';
import { Building } from 'src/app/shared/models/building.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css']
})
export class EditBuildingComponent implements OnInit {

  constructor(private storageData: StorageDataService,
              private route: ActivatedRoute,
              private router: Router) { }
  @Input() building: any;
  errorClass: boolean;
  nameInvalid: string;
  // buildingId: string;
  editBuilding = new FormGroup({
    nameBuilding: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  buildings: any;
  idBuilding: any;
  nameBuilding: string;
  address: string;
  info: string;



  // editBuilding = new FormGroup({
  //   nameBuilding: new FormControl(null, [Validators.required]),
  //   address: new FormControl(null, Validators.required),
  //   info: new FormControl( null),
  // });

  ngOnInit() {

     // this.buildings = this.storageData.loadBuildings();
     // console.log(this.storageData.buildings, this.route.snapshot.params['id']);
     if (this.storageData.buildings) {
      for (const building of this.storageData.buildings) {

        if (building._id === this.route.snapshot.params['id']) {
          this.idBuilding = building._id;
          this.nameBuilding = building.nameBuilding;
          this.address = building.address;
          this.info = building.info;
         this.editBuilding = new FormGroup({

           nameBuilding: new FormControl(building.nameBuilding, [Validators.required]),
           address: new FormControl(building.address, Validators.required),
           info: new FormControl( building.info),
         });

        }



      }
     }
     if (this.storageData.buildings === undefined) {
      this.router.navigate(['dashboard/buildings']);
    }
  }

  onSubmit(id: string) {

    this.storageData.buildingId = id;
    this.storageData.editView = 0;
    const name = this.editBuilding.value.nameBuilding;
    const address = this.editBuilding.value.address;
    const info = this.editBuilding.value.info;
    this.storageData.editBuilding(id, name, address, info);
    this.storageData.loadBuildings();
    this.router.navigate(['dashboard/buildings']);

  }
}
