export class CreateRepairDto {
  clientId: number;
  manufacturerId: number;
  reason: string;
  shippingDate: Date;
  shipId: string;
  receivedDate: Date;
}
