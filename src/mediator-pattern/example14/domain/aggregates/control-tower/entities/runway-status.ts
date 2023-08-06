import { WeatherCondition } from "../../../shared/enums";
import {
  RunwayUsageStatus,
  RunwayLightStatus,
  RunwaySurfaceStatus,
  RunwayCleaningStatus,
  RunwayVisibilityStatus,
  RunwayOperationalStatus,
  RunwayMaintenanceStatus,
  RunwayConstructionStatus,
} from "../enums";

export class RunwayStatus {
  isOccupied: boolean;
  usageStatus: RunwayUsageStatus;
  lightStatus: RunwayLightStatus;
  surfaceStatus: RunwaySurfaceStatus;
  cleaningStatus: RunwayCleaningStatus;
  visibilityStatus: RunwayVisibilityStatus;
  weatherCondition: WeatherCondition;
  maintenanceStatus: RunwayMaintenanceStatus;
  operationalStatus: RunwayOperationalStatus;
  constructionStatus: RunwayConstructionStatus;

  constructor(
    isOccupied: boolean,
    surfaceStatus: RunwaySurfaceStatus,
    lightStatus: RunwayLightStatus,
    maintenanceStatus: RunwayMaintenanceStatus,
    visibilityStatus: RunwayVisibilityStatus,
    constructionStatus: RunwayConstructionStatus,
    operationalStatus: RunwayOperationalStatus,
    usageStatus: RunwayUsageStatus,
    cleaningStatus: RunwayCleaningStatus,
    weatherCondition: WeatherCondition
  ) {
    this.isOccupied = isOccupied;
    this.surfaceStatus = surfaceStatus;
    this.lightStatus = lightStatus;
    this.maintenanceStatus = maintenanceStatus;
    this.visibilityStatus = visibilityStatus;
    this.constructionStatus = constructionStatus;
    this.operationalStatus = operationalStatus;
    this.usageStatus = usageStatus;
    this.cleaningStatus = cleaningStatus;
    this.weatherCondition = weatherCondition;
  }

  occupy(): void {
    this.isOccupied = true;
  }

  release(): void {
    this.isOccupied = false;
  }

  switchLights(lightStatus: RunwayLightStatus): void {
    this.lightStatus = lightStatus;
  }

  updateSurfaceStatus(surfaceStatus: RunwaySurfaceStatus): void {
    this.surfaceStatus = surfaceStatus;
  }

  updateMaintenanceStatus(maintenanceStatus: RunwayMaintenanceStatus): void {
    this.maintenanceStatus = maintenanceStatus;
  }

  updateVisibilityStatus(visibilityStatus: RunwayVisibilityStatus): void {
    this.visibilityStatus = visibilityStatus;
  }

  updateWeatherCondition(weatherCondition: WeatherCondition): void {
    this.weatherCondition = weatherCondition;
  }

  startConstruction(): void {
    this.constructionStatus = RunwayConstructionStatus.UNDER_CONSTRUCTION;
  }

  completeConstruction(): void {
    this.constructionStatus = RunwayConstructionStatus.CONSTRUCTION_COMPLETED;
  }

  markOperational(): void {
    this.operationalStatus = RunwayOperationalStatus.OPERATIONAL;
  }

  markNonOperational(): void {
    this.operationalStatus = RunwayOperationalStatus.NON_OPERATIONAL;
  }

  setUsageStatus(usageStatus: RunwayUsageStatus): void {
    this.usageStatus = usageStatus;
  }

  markCleaningRequired(): void {
    this.cleaningStatus = RunwayCleaningStatus.CLEANING_REQUIRED;
  }

  startCleaning(): void {
    this.cleaningStatus = RunwayCleaningStatus.CLEANING_IN_PROGRESS;
  }

  completeCleaning(): void {
    this.cleaningStatus = RunwayCleaningStatus.CLEAN;
  }
}
