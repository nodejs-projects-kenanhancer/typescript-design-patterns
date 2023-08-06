import {
  Emergency,
  FlightPlan,
  FuelStatus,
  AirTraffic,
  WeatherUpdate,
  RunwayCondition,
  MaintenanceStatus,
} from "../value-objects";
import { Airplane } from "../outbound-contracts";
import { ControlTower } from "../../control-tower/outbound-contracts";
import { Position } from "../../control-tower/value-objects";
import { AirplaneRequest } from "../../control-tower/enums";

export class Airbus implements Airplane {
  name: string;
  private readonly controlTower: ControlTower;

  constructor(name: string, controlTower: ControlTower) {
    this.name = name;
    this.controlTower = controlTower;
  }

  // AirplaneIncomingCommands methods

  receiveLandingPermission(): void {
    console.log(`${this.name} received landing permission`);
  }

  receiveTakeoffPermission(): void {
    console.log(`${this.name} received takeoff permission`);
  }

  receiveTaxiPermission(): void {
    console.log(`${this.name} received taxi permission`);
  }

  receiveEmergencyLandPermission(): void {
    console.log(`${this.name} received emergency land permission`);
  }

  receiveRefuelConfirmation(): void {
    console.log(`${this.name} received refuel confirmation`);
  }

  receiveRunwayCondition(runwayCondition: RunwayCondition): void {
    console.log(`${this.name} received runway condition: ${runwayCondition}`);
  }

  receiveMaintenanceUpdate(maintenanceUpdate: MaintenanceStatus): void {
    console.log(
      `${this.name} received maintenance update: ${maintenanceUpdate}`
    );
  }

  receiveFuelStatusUpdate(fuelStatusUpdate: FuelStatus): void {
    console.log(
      `${this.name} received fuel status update: ${fuelStatusUpdate}`
    );
  }

  receiveAirTrafficUpdate(airTraffic: AirTraffic): void {
    console.log(`${this.name} received air traffic update: ${airTraffic}`);
  }

  receiveWeatherUpdate(weatherUpdate: WeatherUpdate): void {
    console.log(`${this.name} received weather update: ${weatherUpdate}`);
  }

  receiveFlightPlan(flightPlan: FlightPlan): void {
    console.log(`${this.name} received flight plan: ${flightPlan}`);
  }

  receiveEmergency(emergency: Emergency): void {
    console.log(`${this.name} received emergency: ${emergency}`);
  }

  // AirplaneOutgoingRequests methods

  requestLanding(): void {
    this.controlTower.handleLandingRequest(this.name);
  }

  requestTakeoff(): void {
    this.controlTower.handleTakeoffRequest(this.name);
  }

  requestTaxi(): void {
    this.controlTower.handleTaxiRequest(this.name);
  }

  requestRunwayCondition(): void {
    this.controlTower.handleRunwayConditionRequest(this.name);
  }

  requestWeather(): void {
    this.controlTower.handleWeatherRequest(this.name);
  }

  requestAirTraffic(): void {
    this.controlTower.handleAirTrafficRequest(this.name);
  }

  requestEmergencyLand(): void {
    this.controlTower.handleEmergencyLandRequest(this.name);
  }

  requestRefuel(): void {
    this.controlTower.handleRefuelRequest(this.name);
  }

  reportPosition(position: Position): void {
    this.controlTower.handlePositionReport(this.name, position);
  }

  reportFuelStatus(fuelStatus: FuelStatus): void {
    this.controlTower.handleFuelStatusReport(this.name, fuelStatus);
  }

  reportMaintenanceStatus(maintenanceStatus: MaintenanceStatus): void {
    this.controlTower.handleMaintenanceStatusReport(
      this.name,
      maintenanceStatus
    );
  }
}
