export interface Report {
  _id?: string;
  now: Date;
  namePayment: string;
  idBuilding: string;
  idRoom: string;
  // nameRoom: string;
  from?: Date;
  to?: Date;
  amount: number;
  deposit?: number;
  info?: string;
  type: string;
  paymentType: string;
}
