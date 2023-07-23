import { Airplane } from "./airplane";
import { AirplaneService } from "./services";
import { AirplaneRequest } from "../mediator";

export class Boeing implements Airplane {
  name: string;
  private readonly airplaneService: AirplaneService;

  constructor(name: string, airplaneService: AirplaneService) {
    this.name = name;
    this.airplaneService = airplaneService;
    airplaneService.register(this);
  }

  requestLanding(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Landing,
      from: this,
    });
  }

  requestTakeoff(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Takeoff,
      from: this,
    });
  }

  requestTaxi(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Taxi,
      from: this,
    });
  }

  reportPosition(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Position,
      from: this,
    });
  }

  reportEmergency(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Emergency,
      from: this,
    });
  }

  reportMaintenanceStatus(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Maintenance,
      from: this,
    });
  }

  requestFuel(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.Refueling,
      from: this,
    });
  }

  reportFuelStatus(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.FuelStatus,
      from: this,
    });
  }

  requestRunwayConditions(): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.RunwayCondition,
      from: this,
    });
  }

  receiveWeatherUpdate(weatherUpdate: string): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.WeatherUpdate,
      weatherUpdate,
      from: this,
    });
  }

  receiveFlightPlan(flightPlan: string): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.FlightPlan,
      flightPlan,
      from: this,
    });
  }

  receivePassengerCount(passengerCount: number): void {
    this.airplaneService.sendRequest({
      type: AirplaneRequest.PassengerCount,
      passengerCount,
      from: this,
    });
  }

  receive(message: string): void {
    this.airplaneService.receive(this, message);
  }
}
