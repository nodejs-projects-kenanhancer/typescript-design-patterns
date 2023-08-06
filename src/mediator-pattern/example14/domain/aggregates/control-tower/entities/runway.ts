import { Airplane } from "../../../shared/contracts";
import {
  Direction,
  LandingType,
  TakeoffType,
  WeatherCondition,
} from "../../../shared/enums";
import {
  RunwayLightStatus,
  RunwayMaintenanceStatus,
  RunwayOperationalStatus,
  RunwaySurfaceStatus,
  RunwayUsageStatus,
  RunwayVisibilityStatus,
} from "../enums";
import { RunwayStatus } from "./runway-status";

export class Runway {
  name: string;
  width: number;
  length: number;
  maxPlaneSize: number;
  minRunwayLength: number;
  northExitAvailable: boolean;
  southExitAvailable: boolean;
  eastExitAvailable: boolean;
  westExitAvailable: boolean;
  status: RunwayStatus;

  constructor(
    name: string,
    width: number,
    length: number,
    maxPlaneSize: number,
    minRunwayLength: number,
    northExitAvailable: boolean,
    southExitAvailable: boolean,
    eastExitAvailable: boolean,
    westExitAvailable: boolean,
    status: RunwayStatus
  ) {
    this.name = name;
    this.width = width;
    this.length = length;
    this.maxPlaneSize = maxPlaneSize;
    this.minRunwayLength = minRunwayLength;
    this.northExitAvailable = northExitAvailable;
    this.southExitAvailable = southExitAvailable;
    this.eastExitAvailable = eastExitAvailable;
    this.westExitAvailable = westExitAvailable;
    this.status = status;
  }

  private nightTimeAvailability(airPlane: Airplane): boolean {
    // Assuming at night, more conditions should be met for a plane to land
    return (
      airPlane.specification.exteriorFeatures.hasHighIntensityLighting &&
      airPlane.specification.exteriorFeatures.hasInstrumentLandingSystem
    );
  }

  private isSuitableForTakeoffType(takeoffType: TakeoffType): boolean {
    switch (takeoffType) {
      case TakeoffType.STANDARD:
        // No special conditions for standard takeoff
        return true;
      case TakeoffType.SHORT:
        // For short takeoff, runway length should be less than 1500 meters
        return this.length < 1500;
      case TakeoffType.LONG:
        // For long takeoff, runway length should be more than 3000 meters
        return this.length > 3000;
      default:
        const exhaustiveCheck: never = takeoffType;
        throw new Error(`Unrecognized Takeoff Type ${exhaustiveCheck}`);
    }
  }

  canExit(direction: Direction) {
    const directionMapping: { [key in Direction]: () => boolean } = {
      [Direction.NORTH]: () => this.canExitNorth(),
      [Direction.SOUTH]: () => this.canExitSouth(),
      [Direction.EAST]: () => this.canExitEast(),
      [Direction.WEST]: () => this.canExitWest(),
    };

    return directionMapping[direction];
  }

  isAvailableForLanding(airPlane: Airplane, landingType: LandingType): boolean {
    return (
      !this.status.isOccupied &&
      this.maxPlaneSize >= airPlane.status.passengerCount &&
      this.status.lightStatus === RunwayLightStatus.ON &&
      this.status.visibilityStatus !== RunwayVisibilityStatus.VERY_POOR &&
      this.status.maintenanceStatus !== RunwayMaintenanceStatus.POOR &&
      this.status.operationalStatus === RunwayOperationalStatus.OPERATIONAL &&
      landingType === LandingType.Nighttime &&
      this.nightTimeAvailability(airPlane)
    );
  }

  isAvailableForTakeOff(airPlane: Airplane, takeoffType: TakeoffType): boolean {
    return (
      !this.status.isOccupied &&
      this.maxPlaneSize >= airPlane.status.passengerCount &&
      this.status.lightStatus === RunwayLightStatus.ON &&
      this.status.visibilityStatus !== RunwayVisibilityStatus.VERY_POOR &&
      this.status.maintenanceStatus !== RunwayMaintenanceStatus.POOR &&
      this.status.operationalStatus === RunwayOperationalStatus.OPERATIONAL &&
      this.isSuitableForTakeoffType(takeoffType)
    );
  }

  canExitNorth(): boolean {
    // Check if the north exit is currently available
    return (
      this.northExitAvailable &&
      this.status.weatherCondition !== WeatherCondition.SEVERE &&
      this.status.maintenanceStatus !== RunwayMaintenanceStatus.POOR
    );
  }

  canExitSouth(): boolean {
    // Check if the south exit is currently available
    return (
      this.southExitAvailable &&
      this.status.weatherCondition !== WeatherCondition.SEVERE &&
      this.status.maintenanceStatus !== RunwayMaintenanceStatus.POOR
    );
  }

  canExitEast(): boolean {
    // Check if the east exit is currently available
    return (
      this.eastExitAvailable &&
      this.status.weatherCondition !== WeatherCondition.SEVERE &&
      this.status.maintenanceStatus !== RunwayMaintenanceStatus.POOR
    );
  }

  canExitWest(): boolean {
    // Check if the west exit is currently available
    return (
      this.westExitAvailable &&
      this.status.weatherCondition !== WeatherCondition.SEVERE &&
      this.status.maintenanceStatus !== RunwayMaintenanceStatus.POOR
    );
  }

  occupy(): void {
    this.status.occupy();
  }

  release(): void {
    this.status.release();
  }

  switchLights(lightStatus: RunwayLightStatus): void {
    this.status.switchLights(lightStatus);
  }

  updateSurfaceStatus(surfaceStatus: RunwaySurfaceStatus): void {
    this.status.updateSurfaceStatus(surfaceStatus);
  }

  updateMaintenanceStatus(maintenanceStatus: RunwayMaintenanceStatus): void {
    this.status.updateMaintenanceStatus(maintenanceStatus);
  }

  updateVisibilityStatus(visibilityStatus: RunwayVisibilityStatus): void {
    this.status.updateVisibilityStatus(visibilityStatus);
  }

  startConstruction(): void {
    this.status.startConstruction();
  }

  completeConstruction(): void {
    this.status.completeConstruction();
  }

  markOperational(): void {
    this.status.markOperational();
  }

  markNonOperational(): void {
    this.status.markNonOperational();
  }

  setUsageStatus(usageStatus: RunwayUsageStatus): void {
    this.status.setUsageStatus(usageStatus);
  }

  markCleaningRequired(): void {
    this.status.markCleaningRequired();
  }

  startCleaning(): void {
    this.status.startCleaning();
  }

  completeCleaning(): void {
    this.status.completeCleaning();
  }
}
