import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';


@Component({
  selector: 'app-list-building',
  templateUrl: './list-building.component.html',
  styleUrls: ['./list-building.component.css']
})
export class ListBuildingComponent implements OnInit, OnDestroy {

  constructor(private storageData: StorageDataService) { }
  buildingsUpadate: Subscription;
  buildings: any;
  buildingId: string;
  open: boolean;
  editView = this.storageData.editView;

  ngOnInit() {

    this.buildings = this.storageData.loadBuildings();
    this.buildingsUpadate = this.storageData.checkBuildingUpdate()
      .subscribe((buildings: any) => {
      this.storageData.tabIndex = undefined;
      this.buildings = buildings;
      this.editView = this.storageData.editView;
      this.buildingId = this.storageData.buildingId;
      this.open = false;
    });
  }
  onDelete(id: string) {
    this.storageData.deleteBuilding(id);
  }

  onEdit(id: string) {
    this.editView = 1;
  }
  ngOnDestroy() {
    this.buildingsUpadate.unsubscribe();
  }
}
