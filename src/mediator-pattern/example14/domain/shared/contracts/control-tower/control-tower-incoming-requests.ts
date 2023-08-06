import { RunwayStatus } from "../../../aggregates/control-tower/entities";
import { AirplaneMediator } from "../../../shared/contracts";
import {
  Direction,
  GateStatus,
  InquiryType,
  LandingType,
  TakeoffType,
  TaxiSpeed,
} from "../../../shared/enums";
import {
  AirTrafficInfo,
  AirTrafficStatus,
  EmergencyInfo,
  FuelInfo,
  WeatherStatus,
} from "../../../shared/value-objects";
import { ControlTower } from "./control-tower";

export interface ControlTowerIncomingRequests extends ControlTower {
  handleLandingRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    landingType: LandingType
  ): void;

  handleTakeoffRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    takeoffType: TakeoffType
  ): void;

  handleRunwayExitRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    direction: Direction
  ): void;

  handleTaxiToGateRequest(
    airplane: AirplaneMediator,
    gateId: string,
    taxiSpeed: TaxiSpeed
  ): void;

  handleEngineShutdownRequest(
    airplane: AirplaneMediator,
    engineId: string
  ): void;

  handleEmergencyLandingRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    emergencyInfo: EmergencyInfo
  ): void;

  handleRefuelingRequest(airplane: AirplaneMediator, fuelInfo: FuelInfo): void;

  // handling inquiries from Airplane
  handleRunwayStatusInquiry(
    airplane: AirplaneMediator,
    runwayId: string,
    inquiryType: InquiryType
  ): RunwayStatus;

  handleGateAvailabilityInquiry(
    airplane: AirplaneMediator,
    gateId: string,
    inquiryType: InquiryType
  ): GateStatus;

  handleWeatherConditionInquiry(
    airplane: AirplaneMediator,
    location: string
  ): WeatherStatus;

  handleAirTrafficInquiry(
    airplane: AirplaneMediator,
    info: AirTrafficInfo
  ): AirTrafficStatus;
}
