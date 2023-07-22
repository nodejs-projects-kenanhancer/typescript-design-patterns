// Colleague interface
export interface Airplane {
  name: string;

  receive(message: string): void;
  requestLanding(): void;
  requestTakeoff(): void;
  requestTaxi(): void;
  reportPosition(): void;
  reportEmergency(): void;
  reportMaintenanceStatus(): void;
  requestFuel(): void;
  reportFuelStatus(): void;
  requestRunwayConditions(): void;
  receiveFlightPlan(flightPlan: string): void;
  receiveWeatherUpdate(weatherUpdate: string): void;
  receivePassengerCount(passengerCount: number): void;
}
