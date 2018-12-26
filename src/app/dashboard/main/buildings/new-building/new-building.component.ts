import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-new-building',
  templateUrl: './new-building.component.html',
  styleUrls: ['./new-building.component.css']
})
export class NewBuildingComponent implements OnInit {
  newBuilding = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    address: new FormControl(null, Validators.required),
    info: new FormControl( null),
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    // this.isLoading = true;
    const name = this.newBuilding.value.name;
    const address = this.newBuilding.value.address;
    const info = this.newBuilding.value.address;
    this.authService.createNewBuilding(name, address, info);
  }
}
