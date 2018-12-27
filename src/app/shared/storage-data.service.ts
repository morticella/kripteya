import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { UsersLevel } from './user-level/user-level.module';
import { Building } from './models/building.model';
// import { Room } from './models/room.model';

@Injectable()
export class StorageDataService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  urlBackEnd = 'http://localhost:3000';
  user: string;
  level: string;
  private userslevel: UsersLevel[];
  // private newBuilding: Building;
  private viewUpdate = new Subject<number>();
  private newBuildingUpdate = new Subject<Building[]>();
  private usersLevelUpdate = new Subject<UsersLevel[]>();
  private errorUpdate = new Subject<number>();
  // Buildings: Building[];
  buildings: any;
  errorHeadersStatus: number;
  users: any;
  data: any;
  setUp: boolean;
  count: number;
  view = 0;
  // room: Room;

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
  loadBuildings() {
    this.http.get(this.urlBackEnd + '/api/buildings')
      .subscribe((buildingsData) => {
       this.buildings = buildingsData;
        this.newBuildingUpdate.next(this.buildings);
      },
      err => console.log(err));
  }

  deleteBuilding(id: string) {
    // console.log('ID ', id);
    this.http.delete(this.urlBackEnd + '/api/new-building/' + id)
      .subscribe(() => {
        const updatedBuildings = this.buildings.filter(buildings => buildings._id !== id );
        // this.buildings = buildingsData;
        // this.newBuildingUpdate.next(this.buildings);
        this.buildings = updatedBuildings;
        this.newBuildingUpdate.next(this.buildings);
      },
      err => console.log(err));
  }

  createNewBuilding(name: string, address: string, info: string) {

    const newBuilding: Building = {
      nameBuilding: name,
      address: address,
      info: info,
    };

    // console.log('risultato', newBuilding);
    this.http.post<{status: number}>(this.urlBackEnd + '/api/new-building', newBuilding)
      .subscribe(response => {
        // console.log('risultato', response);
        this.errorUpdate.next(200);
      },
      error => {
        if (error.status === 500) {
          this.errorUpdate.next(500);
        }
      });
  }

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
