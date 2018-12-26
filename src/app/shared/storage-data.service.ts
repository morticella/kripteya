import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { UsersLevel } from './user-level/user-level.module';

@Injectable()
export class StorageDataService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  user: string;
  level: string;
  private userslevel: UsersLevel[];
  private usersLevelUpdate = new Subject<UsersLevel[]>();
  users: any;
  data: any;
  setUp: boolean;
  count: number;

  loadUsers() {
    this.http.get<UsersLevel[]>('http://localhost:3000/api/users')
      .subscribe((usersData) => {
        this.users = usersData;
        this.usersLevelUpdate.next(this.users);
      },
      err => console.log(err));
  }

  insertUser(user, password, level) {

  }

  checkLoadedUsers() {
    return this.usersLevelUpdate.asObservable();
  }

}
