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
  // private userslevel: UsersLevel[];
  // private newBuilding: Building;
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
  // loadBuildings() {
  //   this.http.get(this.urlBackEnd + '/api/buildings')
  //     .subscribe((buildingsData) => {
  //      this.buildings = buildingsData;
  //      // console.log(this.buildings);
  //       this.newBuildingUpdate.next(this.buildings);
  //     },
  //     err => console.log(err));
  // }

  deleteBuilding(id: string) {
    this.http.delete(this.urlBackEnd + '/api/new-building/' + id)
      .subscribe(() => {
        const updatedBuildings = this.buildings.filter(buildings => buildings._id !== id );
        this.buildings = updatedBuildings;
        this.newBuildingUpdate.next(this.buildings);
      },
      err => console.log(err));
  }
  editBuilding(id: string, nameBuilding: string, address: string, info: string) {
    const building: Building = {nameBuilding: nameBuilding, address: address, info: info};
    this.http.put(this.urlBackEnd + '/api/new-building/' + id, building)
      .subscribe(response => {
        const updatedBuildings = [...this.buildings];
        const oldBuildingIndex = updatedBuildings.findIndex(b => b.id === id);
        updatedBuildings[oldBuildingIndex] = building;
       this.buildings = updatedBuildings;
        this.newBuildingUpdate.next([...this.buildings]);
      },
      err => console.log(err));
  }
  // createNewBuilding(name: string, address: string, info: string) {

  //   const newBuilding: Building = {
  //     // _id: null,
  //     nameBuilding: name,
  //     address: address,
  //     info: info,
  //   };

  //   this.http.post<{status: number}>(this.urlBackEnd + '/api/new-building', newBuilding)
  //     .subscribe(response => {
  //       this.tabIndex = 0;
  //       console.log('qui che succede', this.tabIndex);
  //       this.errorUpdate.next(200);
  //     },
  //     error => {
  //       if (error.status === 500) {
  //         this.tabIndex = 1;
  //         console.log('qui che succede errore', this.tabIndex);
  //         this.errorUpdate.next(500);
  //       }
  //     });
  // }


  createNewRoom(data) {

    const newRoom: Room = {
      nameBuilding: data.value.nameBuilding,
      name: data.value.name,
      rent: data.value.rent,
      beds: data.value.beds,
      gender: data.value.gender,
      deposit: data.value.deposit,
      booked: data.value.booked,
      notice: data.value.notice
    };

    // this.http.post<{status: number}>(this.urlBackEnd + '/api/new-room', newRoom)
    //   .subscribe(response => {
    //     // this.tabIndex = 0;
    //     // console.log('qui che succede', this.tabIndex);
    //     this.errorUpdate.next(200);
    //   },
    //   error => {
    //     if (error.status === 500) {
    //       // this.tabIndex = 1;
    //       // console.log('qui che succede errore', this.tabIndex);
    //       this.errorUpdate.next(500);
    //     }
    //   });
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
