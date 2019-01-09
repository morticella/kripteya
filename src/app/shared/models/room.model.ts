// import { Customer } from './customer.model';

export interface Room {
  idBuilding: string;
  name: string;
  gender: boolean;
  beds: number;
  rent: number;
  deposit: number;
  notice: Date;
  booked: Date;
  // customers: string;
}
