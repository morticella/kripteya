export interface Customer {
  _id?: string;
  idBuilding: string;
  idRoom: string;
  name: string;
  // gender: string;
  rent: number;
  deposit: number;
  booked: Date;
  notice: Date;
}
