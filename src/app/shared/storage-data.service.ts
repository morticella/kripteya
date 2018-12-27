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
  // room: Room;

  loadUsers() {
    this.http.get<UsersLevel[]>('http://localhost:3000/api/users')
      .subscribe((usersData) => {
        this.users = usersData;
        this.usersLevelUpdate.next(this.users);
        console.log(usersData);
      },
      err => console.log(err));
  }

  loadBuildings() {
    this.http.get('http://localhost:3000/api/buildings')
      .subscribe((buildingsData) => {
       this.buildings = buildingsData;

        this.newBuildingUpdate.next(this.buildings);
        // console.log('ci sei?', buildingsData);
      },
      err => console.log(err));
  }

  createNewBuilding(name: string, address: string, info: string) {
    // const room = [];
    const newBuilding: Building = {
      nameBuilding: name,
      address: address,
      info: info,
      // rooms: room
    };

    console.log('risultato', newBuilding);
    this.http.post<{status: number}>('http://localhost:3000/api/new-building', newBuilding)
      .subscribe(response => {
        console.log('risultato', response);
        this.errorUpdate.next(200);
      },
      error => {
        if (error.status === 500) {
          this.errorUpdate.next(500);
        }
      });
  }

  checkHeadersError() {
    return this.errorUpdate.asObservable();
  }

  checkBuildingUpdate() {
    return this.newBuildingUpdate.asObservable();
  }
  // getHeadersError() {
  //   this.http.get('http://localhost:3000/api/new-building');
  // }
  checkLoadedUsers() {
    return this.usersLevelUpdate.asObservable();
  }

}
