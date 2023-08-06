import {
  Direction,
  InquiryType,
  LandingType,
  TakeoffType,
  TaxiSpeed,
} from "../../enums";
import { AirTrafficInfo, EmergencyInfo, FuelInfo } from "../../value-objects";
import { Airplane } from "./airplane";

export interface AirplaneOutgoingRequests extends Airplane {
  requestLandingPermission(runwayId: string, landingType: LandingType): void;

  requestTakeoffPermission(runwayId: string, takeoffType: TakeoffType): void;

  requestRunwayExitPermission(runwayId: string, direction: Direction): void;

  requestTaxiToGatePermission(gateId: string, taxiSpeed: TaxiSpeed): void;

  requestEngineShutdownPermission(engineId: string): void;

  requestEmergencyLandingPermission(
    runwayId: string,
    emergencyInfo: EmergencyInfo
  ): void;

  requestRefuelingPermission(fuelInfo: FuelInfo): void;

  inquireRunwayStatus(runwayId: string, inquiryType: InquiryType): void;

  inquireGateAvailability(gateId: string, inquiryType: InquiryType): void;

  inquireWeatherCondition(location: string): void;

  inquireAirTraffic(info: AirTrafficInfo): void;
}
