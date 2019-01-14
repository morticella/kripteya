import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  now: Date = new Date();
  expiresIn: Date  = new Date(localStorage.getItem('expiresIn'));
  timeDiff = Math.abs(this.expiresIn.getTime() - this.now.getTime());
  logout = Math.ceil(this.timeDiff / (1000));
  countdownLogout: string | number;

  ngOnInit() {

  }

}
