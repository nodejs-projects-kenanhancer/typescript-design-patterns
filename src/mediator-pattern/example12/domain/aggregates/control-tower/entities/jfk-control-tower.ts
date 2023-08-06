import {
  AirTraffic,
  Emergency,
  EmergencyStatus,
  FlightPlan,
  FuelStatus,
  MaintenanceStatus,
  Position,
  Runway,
  RunwayCondition,
  WeatherCondition,
} from "../../../shared/value-objects";
import { Airplane } from "../../airplane/outbound-contracts";
import { ControlTower } from "../outbound-contracts/control-tower";
import { RunwayConditionStatus, RunwayStatus } from "../../../shared/enums";

// Concrete Mediator
export class JFKControlTower implements ControlTower {
  private readonly airplanes: Airplane[] = [];
  private runways: Runway[] = [];
  private fuelInventory: number;

  constructor(runways: Runway[]) {
    // Initialize the fuel inventory with a certain amount of fuel
    this.fuelInventory = 10000; // The number here is arbitrary
    this.runways = runways;
  }

  // Assume that we have a method that returns the nearest available runway
  private getNearestAvailableRunway(airplane: Airplane): Runway {
    // Filter for available runways that can handle the size of the airplane
    const suitableRunways = this.runways.filter(
      (runway) =>
        runway.status === RunwayStatus.Available &&
        runway.maxSize >= airplane.size
    );

    if (suitableRunways.length === 0) {
      // No suitable runway is available.
      return null;
    }

    // For simplicity, let's just return the first suitable runway.
    // In a more realistic scenario, you'd need more complex logic here.
    return suitableRunways[0];
  }

  private canProvideFuel(): boolean {
    // Check if there is enough fuel in the inventory
    // In this case, we arbitrarily decide that we need at least 100 units of fuel to fulfill a request
    if (this.fuelInventory >= 100) {
      return true;
    } else {
      return false;
    }
  }

  // ControlTowerIncomingRequests methods
  handleLandingRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling landing request from ${airplane.name}`
    );

    // Let's simulate some decision making for the landing permission...
    setTimeout(() => {
      // For simplicity, let's assume we always grant the permission
      const runway = this.getNearestAvailableRunway(airplane);
      airplane.receiveLandingPermission(runway);
    }, 1000); // A delay of 1 second
  }

  handleTaxiRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling taxi request from ${airplane.name}`
    );

    airplane.receiveTaxiPermission(); // Assuming always permitted for simplicity
  }

  handleRefuelRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling refueling request from ${airplane.name}`
    );

    // The control tower might need to perform some validation or business logic here
    // before sending a confirmation back to the airplane
    // For example, it could check if there are enough fuel resources available
    if (this.canProvideFuel()) {
      airplane.receiveRefuelPermission(); // Assuming always permitted for simplicity
      console.log(`Sent fuel confirmation to ${airplane.name}`);
    } else {
      console.log(`Cannot provide fuel to ${airplane.name}`);
    }
  }

  handleTakeoffRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling takeoff request from ${airplane.name}`
    );

    airplane.receiveTakeoffPermission();
  }

  handleAirTrafficRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling air traffic request from ${airplane.name}`
    );

    const otherAirplanes = this.airplanes.filter(
      (ap) => ap.name !== airplane.name
    );

    const airTraffic: AirTraffic = {
      aircraft: otherAirplanes.map((ap) => {
        return ap.name;
      }),
    };

    airplane.receiveAirTrafficUpdate(airTraffic);
  }

  handleEmergencyLandRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling emergency landing request from ${airplane.name}`
    );

    // Simplifying here, we should decide the most suitable runway based on multiple factors
    const runway = this.getNearestAvailableRunway(airplane);

    // Updating the status of the runway
    runway.status = RunwayStatus.Occupied;

    airplane.receiveEmergencyLandPermission(runway);
  }

  handleRunwayConditionRequest(airplane: Airplane): void {
    console.log(
      `JFK Control Tower is handling runway condition request from ${airplane.name}`
    );

    // For simplicity, let's assume runway 1
    const runway1Condition = new RunwayCondition(
      "Runway 1",
      RunwayConditionStatus.Good
    );

    airplane.receiveRunwayCondition(runway1Condition);
  }

  handleWeatherConditionRequest(airplane: Airplane): void {}

  handlePositionReport(airplane: Airplane, position: Position): void {
    throw new Error("Method not implemented.");
  }

  handleFuelStatusReport(airplane: Airplane, fuelStatus: FuelStatus): void {
    throw new Error("Method not implemented.");
  }

  handlePassengerCountReport(airplane: Airplane, passengerCount: number): void {
    throw new Error("Method not implemented.");
  }

  handleMaintenanceStatusReport(
    airplane: Airplane,
    maintenanceStatus: MaintenanceStatus
  ): void {
    throw new Error("Method not implemented.");
  }

  handleWeatherConditionReport(
    airplane: Airplane,
    weatherCondition: WeatherCondition
  ): void {
    throw new Error("Method not implemented.");
  }

  handleEmergencyStatusReport(
    airplane: Airplane,
    emergencyStatus: EmergencyStatus
  ): void {
    throw new Error("Method not implemented.");
  }

  // ControlTowerOutgoingCommands methods

  sendLandingPermission(airplane: Airplane): void {}

  sendTakeoffPermission(airplane: Airplane): void {}

  sendTaxiPermission(airplane: Airplane): void {}

  sendRefuelPermission(airplane: Airplane): void {}

  sendEmergencyLandPermission(airplane: Airplane): void {}

  sendEmergency(airplane: Airplane, emergency: Emergency): void {}

  sendFlightPlan(airplane: Airplane, flightPlan: FlightPlan): void {}

  sendAirTrafficUpdate(airplane: Airplane, airTraffic: AirTraffic): void {}

  sendWeatherCondition(
    airplane: Airplane,
    weatherCondition: WeatherCondition
  ): void {}

  sendFuelStatusUpdate(
    airplane: Airplane,
    fuelStatusUpdate: FuelStatus
  ): void {}

  sendRunwayCondition(
    airplane: Airplane,
    runwayCondition: RunwayCondition
  ): void {}

  sendMaintenanceUpdate(
    airplane: Airplane,
    maintenanceUpdate: MaintenanceStatus
  ): void {}

  register(airplane: Airplane): void {
    const _airplane = this.airplanes.find((a) => a.name === airplane.name);

    if (_airplane) {
      throw new Error(`${airplane.name} Airplane is already registered`);
    }

    this.airplanes.push(airplane);

    console.log(`JFK Control Tower registered ${airplane.name} Airplane.`);
  }
}
