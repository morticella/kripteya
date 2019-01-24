import { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor (private stateService: StateService) {}
  ngOnInit() {
    this.stateService.reloadControl();
    this.stateService.allowedActionControl$.subscribe( appState => {
      this.stateService.reloadBuildings = appState.buildings.ids[0];
      this.stateService.reloadRooms = appState.rooms.ids[0];
      this.stateService.reloadCustomers = appState.customers.ids[0];
      this.stateService.reloadReports = appState.reports.ids[0];
      // console.log(this.stateService.reloadBuildings);
      // const roomsStateJSON = appState.rooms.entities;
      // this.stateService.roomsStateString = JSON.stringify(roomsStateJSON);
    });
  }

}
