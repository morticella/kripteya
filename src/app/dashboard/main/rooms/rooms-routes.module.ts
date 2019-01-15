import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRoomComponent } from './new-room/new-room.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';
import { EditRoomComponent } from './edit-room/edit-room.component';

import { AuthGuard } from 'src/app/shared/auth.guard';

const roomsRoutes: Routes = [
  { path: 'dashboard/building-rooms' , component: ListRoomsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/building-rooms/:idBuilding' , component: ListRoomsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/new-room/:idBuilding' , component: NewRoomComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/edit-room/:idRoom' , component: EditRoomComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(roomsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
   ]
})
export class RoomsRoutingModule {}
