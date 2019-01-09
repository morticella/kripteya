import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { UsersLevel } from './user-level/user-level.module';
import { Building } from './models/building.model';
import { Room } from './models/room.model';

@Injectable()
export class StorageDataService {
  editView = 0;
  buildingId: string;
  constructor(private http: HttpClient, private authService: AuthService) { }
  urlBackEnd = 'http://localhost:3000';
  user: string;
  level: string;

  private viewUpdate = new Subject<number>();
  private newBuildingUpdate = new Subject<Building[]>();
  private usersLevelUpdate = new Subject<UsersLevel[]>();
  private errorUpdate = new Subject<number>();

  buildings: any;
  buildingsTest: Building[];
  errorHeadersStatus: number;
  users: any;
  data: any;
  setUp: boolean;
  count: number;
  view = 0;
  tabIndex: number;


  loadUsers() {
    this.http.get<UsersLevel[]>(this.urlBackEnd + '/api/users')
      .subscribe((usersData) => {
        this.users = usersData;
        this.usersLevelUpdate.next(this.users);
        // console.log(usersData);
      },
      err => console.log(err));
  }
  changeView (view) {
    this.view = view;
    this.viewUpdate.next(view);
    // console.log(this.viewUpdate.next(view));
  }



  // createNewRoom(data) {

  //   const newRoom: Room = {
  //     idBuilding: data.value.idBuilding,
  //     name: data.value.name,
  //     rent: data.value.rent,
  //     beds: data.value.beds,
  //     gender: data.value.gender,
  //     deposit: data.value.deposit,
  //     booked: data.value.booked,
  //     notice: data.value.notice
  //   };
  // }
  // Observables

  checkHeadersError() {
    return this.errorUpdate.asObservable();
  }

  checkBuildingUpdate() {
    return this.newBuildingUpdate.asObservable();
  }

  checkView() {
    return this.viewUpdate.asObservable();
  }

  checkLoadedUsers() {
    return this.usersLevelUpdate.asObservable();
  }

}
