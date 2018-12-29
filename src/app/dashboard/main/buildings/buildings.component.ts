import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';


@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, OnDestroy {
  viewUpdate: Subscription;
  newBuildingUpdate: Subscription;
  view: any;
  tabIndex: any;

  constructor(private storageData: StorageDataService) { }


  ngOnInit() {
    this.tabIndex = this.storageData.checkBuildingUpdate()
    .subscribe((tabIndex: any) => {
      this.tabIndex = this.storageData.tabIndex;
    });
    this.tabIndex = this.storageData.tabIndex;
    this.view = this.storageData.checkView()
    .subscribe((view: any) => {
      this.viewUpdate = view;
      this.view = this.viewUpdate;
      this.view = +this.view;

    });

    this.view = 0;
  }

  ngOnDestroy() {
    // this.view.unsubscribe();
  }

}
