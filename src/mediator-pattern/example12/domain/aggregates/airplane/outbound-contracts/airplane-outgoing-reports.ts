import {
  EmergencyStatus,
  FuelStatus,
  MaintenanceStatus,
  Position,
  WeatherCondition,
} from "../../../shared/value-objects";

export interface AirplaneOutgoingReports {
  reportPosition(position: Position): void;

  reportFuelStatus(fuelStatus: FuelStatus): void;

  reportPassengerCount(passengerCount: number): void;

  reportEmergencyStatus(emergencyStatus: EmergencyStatus): void;

  reportWeatherCondition(weatherCondition: WeatherCondition): void;

  reportMaintenanceStatus(maintenanceStatus: MaintenanceStatus): void;
}
