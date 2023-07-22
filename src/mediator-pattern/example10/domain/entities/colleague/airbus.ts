import { Airplane } from "./airplane";
import { AirplaneService } from "./services";
import { AirplaneRequest } from "../mediator";

// Concrete Colleague
export class Airbus implements Airplane {
  name: string;
  private readonly airplaneService: AirplaneService;

  constructor(name: string, airplaneService: AirplaneService) {
    this.name = name;
    this.airplaneService = airplaneService;
    airplaneService.register(this);
  }

  requestLanding(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Landing);
  }

  requestTakeoff(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Takeoff);
  }

  requestTaxi(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Taxi);
  }

  reportPosition(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Position);
  }

  reportEmergency(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Emergency);
  }

  reportMaintenanceStatus(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Maintenance);
  }

  requestFuel(): void {
    this.airplaneService.sendRequest(AirplaneRequest.Refueling);
  }

  reportFuelStatus(): void {
    this.airplaneService.sendRequest(AirplaneRequest.FuelStatus);
  }

  requestRunwayConditions(): void {
    this.airplaneService.sendRequest(AirplaneRequest.RunwayCondition);
  }

  receiveWeatherUpdate(weatherUpdate: string): void {
    this.airplaneService.sendRequest(AirplaneRequest.WeatherUpdate, {
      weatherUpdate,
    });
  }

  receiveFlightPlan(flightPlan: string): void {
    this.airplaneService.sendRequest(AirplaneRequest.FlightPlan, {
      flightPlan,
    });
  }

  receivePassengerCount(passengerCount: number): void {
    this.airplaneService.sendRequest(AirplaneRequest.PassengerCount, {
      passengerCount,
    });
  }

  receive(message: string): void {
    this.airplaneService.receive(message);
  }
}
