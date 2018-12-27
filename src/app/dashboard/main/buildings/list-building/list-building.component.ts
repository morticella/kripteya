import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';


@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent implements OnInit {

  constructor(private storageData: StorageDataService) { }
  buildingsUpadate: Subscription;
  buildings: any;
  editView = 0;

  ngOnInit() {
    // console.log('aoao');
    this.buildings = this.storageData.loadBuildings();
    console.log(this.buildings);
    this.buildingsUpadate = this.storageData.checkBuildingUpdate()
      .subscribe((buildings: any) => {
      this.buildings = buildings;
      // console.log('mannaggia' + this.buildings);
    });
  }
  onDelete(id: string) {
    // console.log('id');
    this.storageData.deleteBuilding(id);
  }

  onEdit(id: string) {
    this.editView = 1;
  }

}
