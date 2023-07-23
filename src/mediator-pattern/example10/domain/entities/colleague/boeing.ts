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
    this.airplaneService.sendRequest(AirplaneRequest.Landing, this);
  }

  requestTakeoff(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Takeoff, this);
  }

  requestTaxi(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Taxi, this);
  }

  reportPosition(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Position, this);
  }

  reportEmergency(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Emergency, this);
  }

  reportMaintenanceStatus(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Maintenance, this);
  }

  requestFuel(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Refueling, this);
  }

  reportFuelStatus(): void {
    this.airplaneService.sendRequest(AirplaneRequest.FuelStatus, this);
  }

  requestRunwayConditions(): void {
    this.airplaneService.sendRequest(AirplaneRequest.RunwayCondition, this);
  }

  receiveWeatherUpdate(weatherUpdate: string): void {
    this.airplaneService.sendRequest(AirplaneRequest.WeatherUpdate, this, {
      weatherUpdate,
    });
  }

  receiveFlightPlan(flightPlan: string): void {
    this.airplaneService.sendRequest(AirplaneRequest.FlightPlan, this, {
      flightPlan,
    });
  }

  receivePassengerCount(passengerCount: number): void {
    this.airplaneService.sendRequest(AirplaneRequest.PassengerCount, this, {
      passengerCount,
    });
  }

  receive(message: string): void {
    this.airplaneService.receive(this, message);
  }
}
