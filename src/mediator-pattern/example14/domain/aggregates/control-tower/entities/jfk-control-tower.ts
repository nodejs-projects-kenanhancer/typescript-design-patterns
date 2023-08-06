import {
  AirplaneInquiry,
  AirplaneMediator,
  AirplaneRequest,
  ControlTower,
  ControlTowerMediator,
  ControlTowerIncomingRequests,
} from "../../../shared/contracts";
import {
  AirplaneInquiryType,
  AirplaneRequestType,
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
import { Gate } from "./gate";
import { Runway } from "./runway";
import { RunwayStatus } from "./runway-status";

export class JFKControlTower
  implements ControlTower, ControlTowerIncomingRequests, ControlTowerMediator
{
  private readonly airplanes: AirplaneMediator[] = [];
  runways: Runway[];
  gates: Gate[];

  handleLandingRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    landingType: LandingType
  ): void {
    const runway = this.runways.find((r) => r.name === runwayId);

    if (!runway) throw new Error(`Runway ${runwayId} not found`);
    if (!runway.isAvailableForLanding(airplane, landingType)) {
      airplane.sendResponseToAirplane({
        type: AirplaneRequestType.Landing,
        success: false,
        message: "Runway not available for landing",
      });
      return;
    }

    runway.occupy();

    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.Landing,
      message: `Permission granted to land on ${runwayId}`,
      success: true,
      runwayId,
    });
  }

  handleTakeoffRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    takeoffType: TakeoffType
  ): void {
    const runway = this.runways.find((r) => r.name === runwayId);

    if (!runway) throw new Error(`Runway ${runwayId} not found`);
    if (!runway.isAvailableForTakeOff(airplane, takeoffType)) {
      airplane.sendResponseToAirplane({
        type: AirplaneRequestType.Takeoff,
        success: false,
        message: "Runway not available for takeoff",
      });
      return;
    }

    runway.occupy();
    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.Takeoff,
      success: true,
      message: `Permission granted for takeoff from ${runwayId}`,
      runwayId,
      takeoffType,
    });
  }

  handleRunwayExitRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    direction: Direction
  ): void {
    const runway = this.runways.find((r) => r.name === runwayId);
    if (!runway) throw new Error(`Runway ${runwayId} not found`);

    if (!runway.canExit(direction)) {
      airplane.sendResponseToAirplane({
        type: AirplaneRequestType.RunwayExit,
        success: false,
        message: `Cannot exit from the ${direction} of runway ${runwayId}`,
      });
      return;
    }

    runway.release();
    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.RunwayExit,
      success: true,
      message: `Permission granted to exit runway ${runwayId}`,
      runwayId,
      direction,
    });
  }

  handleTaxiToGateRequest(
    airplane: AirplaneMediator,
    gateId: string,
    taxiSpeed: TaxiSpeed
  ): void {
    const gate = this.gates.find((g) => g.name === gateId);

    if (!gate) throw new Error(`Gate ${gateId} not found`);
    if (!gate.isAvailableForAirplane(airplane)) {
      airplane.sendResponseToAirplane({
        type: AirplaneRequestType.TaxiToGate,
        message: "Gate not available for taxiing",
        success: false,
      });
      return;
    }

    gate.occupy(airplane);
    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.TaxiToGate,
      message: `Permission granted to taxi to gate ${gateId}`,
      success: true,
      gateId,
    });
  }

  handleEmergencyLandingRequest(
    airplane: AirplaneMediator,
    runwayId: string,
    emergencyInfo: EmergencyInfo
  ): void {
    const runway = this.runways.find((r) => r.name === runwayId);
    if (!runway) {
      airplane.sendResponseToAirplane({
        type: AirplaneRequestType.EmergencyLanding,
        message: `Runway ${runwayId} not found`,
        success: false,
      });
    }

    runway.occupy();
    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.EmergencyLanding,
      message: `Permission granted for emergency landing on ${runwayId}`,
      success: true,
      runwayId,
    });
  }

  handleEngineShutdownRequest(
    airplane: AirplaneMediator,
    engineId: string
  ): void {
    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.EngineShutdown,
      message: `Permission granted to shut down engine ${engineId}`,
      success: true,
      engineId,
    });
  }

  handleRefuelingRequest(airplane: AirplaneMediator, fuelInfo: FuelInfo): void {
    airplane.sendResponseToAirplane({
      type: AirplaneRequestType.Refueling,
      success: true,
      message: "Permission granted for refueling",
      fuelInfo,
    });
  }

  handleRunwayStatusInquiry(
    airplane: AirplaneMediator,
    runwayId: string,
    inquiryType: InquiryType
  ): RunwayStatus {
    const runway = this.runways.find((r) => r.name === runwayId);
    if (!runway) throw new Error(`Runway ${runwayId} not found`);

    return runway.status;
  }

  handleGateAvailabilityInquiry(
    airplane: AirplaneMediator,
    gateId: string,
    inquiryType: InquiryType
  ): GateStatus {
    const gate = this.gates.find((g) => g.name === gateId);
    if (!gate) throw new Error(`Gate ${gateId} not found`);

    return gate.currentStatus;
  }

  handleWeatherConditionInquiry(
    airplane: AirplaneMediator,
    location: string
  ): WeatherStatus {
    throw new Error("Method not implemented.");
  }

  handleAirTrafficInquiry(
    airplane: AirplaneMediator,
    info: AirTrafficInfo
  ): AirTrafficStatus {
    throw new Error("Method not implemented.");
  }

  register(airplane: AirplaneMediator): void {
    const _airplane = this.airplanes.find((a) => a.name === airplane.name);

    if (_airplane) {
      throw new Error(`${airplane.name} Airplane is already registered`);
    }

    this.airplanes.push(airplane);

    console.log(`JFK Control Tower registered ${airplane.name} Airplane.`);
  }

  sendRequestToControlTower(request: AirplaneRequest): void {
    switch (request.type) {
      case AirplaneRequestType.Landing:
        this.handleLandingRequest(
          request.from,
          request.runwayId,
          request.landingType
        );
        break;
      case AirplaneRequestType.Takeoff:
        this.handleTakeoffRequest(
          request.from,
          request.runwayId,
          request.takeoffType
        );
        break;
      case AirplaneRequestType.EmergencyLanding:
        this.handleEmergencyLandingRequest(
          request.from,
          request.runwayId,
          request.emergencyInfo
        );
        break;
      case AirplaneRequestType.EngineShutdown:
        this.handleEngineShutdownRequest(request.from, request.engineId);
        break;
      case AirplaneRequestType.Refueling:
        this.handleRefuelingRequest(request.from, request.fuelInfo);
        break;
      case AirplaneRequestType.RunwayExit:
        this.handleRunwayExitRequest(
          request.from,
          request.runwayId,
          request.direction
        );
        break;
      case AirplaneRequestType.TaxiToGate:
        this.handleTaxiToGateRequest(
          request.from,
          request.gateId,
          request.taxiSpeed
        );
        break;
      default:
        const exhaustiveCheck: never = request;
        throw new Error(`Unrecognized Request Type ${exhaustiveCheck}`);
    }
  }

  sendInquiryToControlTower(inquiry: AirplaneInquiry): void {
    switch (inquiry.type) {
      case AirplaneInquiryType.AirTraffic:
        this.handleAirTrafficInquiry(inquiry.from, inquiry.info);
        break;
      case AirplaneInquiryType.GateAvailability:
        this.handleGateAvailabilityInquiry(
          inquiry.from,
          inquiry.gateId,
          inquiry.inquiryType
        );
        break;
      case AirplaneInquiryType.RunwayStatus:
        this.handleRunwayStatusInquiry(
          inquiry.from,
          inquiry.runwayId,
          inquiry.inquiryType
        );
        break;
      case AirplaneInquiryType.WeatherCondition:
        this.handleWeatherConditionInquiry(inquiry.from, inquiry.location);
        break;
      default:
        const exhaustiveCheck: never = inquiry;
        throw new Error(`Unrecognized Inquiry Type ${exhaustiveCheck}`);
    }
  }
}
