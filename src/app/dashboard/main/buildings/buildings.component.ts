import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageDataService } from 'src/app/shared/storage-data.service';


@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit {
  viewUpdate: Subscription;
  view: any;

  constructor(private storageData: StorageDataService) { }


  ngOnInit() {

    console.log('Prima', this.view);
    this.view = this.storageData.checkView()
    .subscribe((view: any) => {
      // console.log('view', view);
      this.viewUpdate = view;
      this.view = this.viewUpdate;
      this.view = +this.view;
      console.log(this.viewUpdate);

    });

    this.view = 0;
    console.log('fine', this.view);
  }

}
