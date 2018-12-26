import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  brand: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.brand = 'Kripteya';
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
    this.userIsAuthenticated = false;
  }
}
