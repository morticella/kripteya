import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSharedModule } from 'src/app/shared/matShared.module';
import { AppRoutesModule } from 'src/app/app.routes.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { NewRoomComponent } from './new-room/new-room.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';



@NgModule({
  declarations: [
    NewRoomComponent,
    ListRoomsComponent

  ],
  imports: [
    SharedModule,
    MatSharedModule,
    CommonModule,
    AppRoutesModule,

  ]
})

export class RoomsModule {}
