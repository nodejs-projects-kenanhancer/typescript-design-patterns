export class AirplaneInteriorFeature {
  passengerCapacity: number;
  cargoCapacity: number;
  seats: number;
  overheadBins: number;
  lavatories: number;

  constructor(
    passengerCapacity: number,
    cargoCapacity: number,
    seats: number,
    overheadBins: number,
    lavatories: number
  ) {
    this.passengerCapacity = passengerCapacity;
    this.cargoCapacity = cargoCapacity;
    this.seats = seats;
    this.overheadBins = overheadBins;
    this.lavatories = lavatories;
  }
}
