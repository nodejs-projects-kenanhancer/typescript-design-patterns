import { AirplaneStatus } from "../../../shared/enums";
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
import { Airplane } from "../outbound-contracts";
import { ControlTower } from "../../control-tower/outbound-contracts";

export class BaseAirplane implements Airplane {
  name: string;
  size: number;
  status: AirplaneStatus;
  private readonly controlTower: ControlTower;

  constructor(name: string, size: number, controlTower: ControlTower) {
    this.name = name;
    this.size = size;
    this.controlTower = controlTower;
  }

  private performPreFlightChecks(): boolean {
    console.log(`Performing pre-flight checks for ${this.name}`);

    // Check the status of the engines
    const enginesCheck = this.checkEngines();
    if (!enginesCheck) {
      console.log(`${this.name} failed engine checks.`);
      return false;
    }

    // Check the status of the navigation systems
    const navigationCheck = this.checkNavigationSystems();
    if (!navigationCheck) {
      console.log(`${this.name} failed navigation systems checks.`);
      return false;
    }

    // Check fuel levels
    const fuelCheck = this.checkFuel();
    if (!fuelCheck) {
      console.log(`${this.name} failed fuel checks.`);
      return false;
    }

    // Check flight control systems
    const flightControlsCheck = this.checkFlightControls();
    if (!flightControlsCheck) {
      console.log(`${this.name} failed flight controls checks.`);
      return false;
    }

    // Check the status of safety equipment
    const safetyEquipmentCheck = this.checkSafetyEquipment();
    if (!safetyEquipmentCheck) {
      console.log(`${this.name} failed safety equipment checks.`);
      return false;
    }

    // Check cabin and cockpit readiness
    const cabinCockpitCheck = this.checkCabinCockpit();
    if (!cabinCockpitCheck) {
      console.log(`${this.name} failed cabin and cockpit readiness checks.`);
      return false;
    }

    console.log(`${this.name} passed all pre-flight checks.`);
    return true;
  }

  private checkEngines(): boolean {
    return Math.random() > 0.05; // 95% chance the check passes
  }

  private checkNavigationSystems(): boolean {
    return Math.random() > 0.05; // 95% chance the check passes
  }

  private checkFuel(): boolean {
    return Math.random() > 0.05; // 95% chance the check passes
  }

  private checkFlightControls(): boolean {
    return Math.random() > 0.05; // 95% chance the check passes
  }

  private checkSafetyEquipment(): boolean {
    return Math.random() > 0.05; // 95% chance the check passes
  }

  private checkCabinCockpit(): boolean {
    return Math.random() > 0.05; // 95% chance the check passes
  }

  private executeDescentSequence(): boolean {
    // In real life, this method would interact with the airplane's avionic systems and perform checks
    // Here we simulate this with a random chance of success
    const isSequenceSuccessful = Math.random() > 0.05; // 95% chance of successful descent sequence
    return isSequenceSuccessful;
  }

  private executeAlignmentSequence(runway: Runway): boolean {
    // In real life, this method would perform complex calculations and interact with the airplane's avionic systems
    // Here we simulate this with a random chance of success
    const isSequenceSuccessful = Math.random() > 0.05; // 95% chance of successful alignment sequence
    return isSequenceSuccessful;
  }

  private areAllDoorsClosed(): boolean {
    // In reality, this would connect to some kind of sensor or system on the airplane
    // that could confirm the status of all doors.
    // To keep it simple, we'll just return true.
    return true;
  }

  private areAllPassengersSeated(): boolean {
    // This would typically involve communication with the flight attendants.
    // Again, to keep it simple, we'll just return true.
    return true;
  }

  private updatePositionWhileTaxiing(): void {
    // The plane's position would be updated in reality by a GPS or tracking system.
    // Here we will simulate this process.
    console.log(`${this.name} is updating its position while taxiing`);
  }

  // AirplaneIncomingCommands methods

  receiveLandingPermission(runway: Runway): void {
    console.log(`${this.name} received landing permission on ${runway.name}`);

    if (this.status !== AirplaneStatus.Flying) {
      console.error(
        `${this.name} is not currently flying and thus can't execute landing procedures.`
      );
      return;
    }

    console.log(`${this.name} is preparing for descent...`);
    this.status = AirplaneStatus.PreparingForDescent;

    if (!this.executeDescentSequence()) {
      console.error(
        `${this.name} failed to prepare for descent. Aborting landing...`
      );
      this.status = AirplaneStatus.Flying;
      return;
    }

    console.log(`${this.name} is aligning with ${runway.name}...`);
    this.status = AirplaneStatus.AligningForLanding;

    if (!this.executeAlignmentSequence(runway)) {
      console.error(
        `${this.name} failed to align for landing. Aborting landing...`
      );
      this.status = AirplaneStatus.Flying;
      return;
    }

    console.log(`${this.name} is landing on ${runway.name}`);
    this.status = AirplaneStatus.Landing;
  }

  receiveTakeoffPermission(): void {
    console.log(`${this.name} received takeoff permission`);

    const preFlightChecksPass = this.performPreFlightChecks();

    if (preFlightChecksPass) {
      console.log(
        `${this.name} passed pre-flight checks and is ready to take off.`
      );
      this.status = AirplaneStatus.TakingOff;
    } else {
      console.log(`${this.name} failed pre-flight checks and cannot take off.`);
      this.status = AirplaneStatus.Grounded;
    }
  }

  receiveTaxiPermission(): void {
    console.log(`${this.name} received taxi permission`);

    if (this.status !== AirplaneStatus.Grounded) {
      throw new Error(
        `Cannot taxi while airplane ${this.name} status is ${this.status}`
      );
    }

    console.log(`${this.name} received taxi permission`);

    // Start taxi process, change the airplane status accordingly
    this.status = AirplaneStatus.Taxiing;

    // Check if all the doors are closed and passengers are seated
    if (!this.areAllDoorsClosed() || !this.areAllPassengersSeated()) {
      console.log(
        `${this.name} is not ready to taxi. Doors are open or passengers are not seated.`
      );
      // If not, halt the taxiing process until the issue is resolved
      this.status = AirplaneStatus.Grounded;
    } else {
      console.log(`${this.name} is taxiing to the runway.`);
      // Update position of airplane while taxiing if tracking system is available
      this.updatePositionWhileTaxiing();
    }
  }

  receiveRefuelPermission(): void {
    console.log(`${this.name} received refuel permission`);
  }

  receiveEmergencyLandPermission(runway: Runway): void {
    console.log(
      `${this.name} received emergency landing permission on ${runway.name}`
    );
  }

  receiveWeatherCondition(weatherCondition: WeatherCondition): void {
    console.log(`${this.name} received weather condition: ${weatherCondition}`);
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

  receiveFlightPlan(flightPlan: FlightPlan): void {
    console.log(`${this.name} received flight plan: ${flightPlan}`);
  }

  receiveEmergency(emergency: Emergency): void {
    console.log(`${this.name} received emergency: ${emergency}`);
  }

  // AirplaneOutgoingRequests methods

  requestLanding(): void {
    console.log(`${this.name} airplane is requesting permission to land.`);

    this.controlTower.handleLandingRequest(this);
  }

  requestTakeoff(): void {
    console.log(`${this.name} is requesting permission to take off.`);

    this.controlTower.handleTakeoffRequest(this);
  }

  requestTaxi(): void {
    console.log(`${this.name} is requesting permission to taxi.`);

    this.controlTower.handleTaxiRequest(this);
  }

  requestRunwayCondition(): void {
    console.log(`${this.name} is requesting runway condition.`);

    this.controlTower.handleRunwayConditionRequest(this);
  }

  requestAirTraffic(): void {
    console.log(`${this.name} is requesting air traffic.`);

    this.controlTower.handleAirTrafficRequest(this);
  }

  requestEmergencyLand(): void {
    console.log(`${this.name} is requesting emergency land.`);

    this.controlTower.handleEmergencyLandRequest(this);
  }

  requestRefuel(): void {
    console.log(`${this.name} is requesting refuel.`);

    this.controlTower.handleRefuelRequest(this);
  }

  requestWeatherCondition(): void {
    console.log(`${this.name} is requesting weather condition.`);

    this.controlTower.handleWeatherConditionRequest(this);
  }

  // AirplaneOutgoingReports methods

  reportPassengerCount(passengerCount: number): void {
    console.log(
      `${this.name} is reporting its passenger count: ${passengerCount}.`
    );

    this.controlTower.handlePassengerCountReport(this, passengerCount);
  }

  reportEmergencyStatus(emergencyStatus: EmergencyStatus): void {
    console.log(
      `${this.name} is reporting its emergency status: ${emergencyStatus}.`
    );

    this.controlTower.handleEmergencyStatusReport(this, emergencyStatus);
  }

  reportWeatherCondition(weatherCondition: WeatherCondition): void {
    console.log(
      `${this.name} is reporting weather condition: ${weatherCondition}.`
    );

    this.controlTower.handleWeatherConditionReport(this, weatherCondition);
  }

  reportPosition(position: Position): void {
    console.log(`${this.name} is reporting its position.`);

    this.controlTower.handlePositionReport(this, position);
  }

  reportFuelStatus(fuelStatus: FuelStatus): void {
    console.log(`${this.name} is reporting its fuel status.`);

    this.controlTower.handleFuelStatusReport(this, fuelStatus);
  }

  reportMaintenanceStatus(maintenanceStatus: MaintenanceStatus): void {
    console.log(
      `${this.name} is reporting its maintenance status: ${maintenanceStatus}`
    );

    this.controlTower.handleMaintenanceStatusReport(this, maintenanceStatus);
  }
}
