import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


import { UsersLevel } from './user-level/user-level.module';
import { Building } from './models/building.model';

@Injectable()
export class StorageDataService {
  editView = 0;
  buildingId: string;
  constructor(private http: HttpClient) { }
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
  }


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
