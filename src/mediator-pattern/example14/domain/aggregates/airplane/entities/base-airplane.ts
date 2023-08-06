import {
  Airplane,
  AirplaneMediator,
  AirplaneOutgoingRequests,
  AirplaneResponse,
  ControlTowerMediator,
} from "../../../shared/contracts";
import {
  AirplaneInquiryType,
  AirplaneRequestType,
  Direction,
  InquiryType,
  LandingType,
  TakeoffType,
  TaxiSpeed,
} from "../../../shared/enums";
import {
  AirTrafficInfo,
  AirplaneSpecification,
  AirplaneStatus,
  EmergencyInfo,
  FuelInfo,
} from "../../../shared/value-objects";

export class BaseAirplane
  implements Airplane, AirplaneOutgoingRequests, AirplaneMediator
{
  name: string;
  specification: AirplaneSpecification;
  status: AirplaneStatus;
  private readonly controlTowerMediator: ControlTowerMediator;

  constructor(
    name: string,
    specification: AirplaneSpecification,
    status: AirplaneStatus,
    controlTowerMediator: ControlTowerMediator
  ) {
    this.name = name;
    this.specification = specification;
    this.status = status;
    this.controlTowerMediator = controlTowerMediator;
  }

  private receiveLandingPermission(): void {}

  private receiveTakeoffPermission(): void {}

  private receiveRunwayExitPermission(): void {}

  private receiveTaxiToGatePermission(): void {}

  private receiveEngineShutdownPermission(): void {}

  private receiveEmergencyLandingPermission(): void {}

  private receiveRefuelingPermission(): void {}

  requestLandingPermission(runwayId: string, landingType: LandingType): void {
    console.log(
      `${this.name} requesting permission to land on runway ${runwayId}. Type of landing: ${LandingType[landingType]}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.Landing,
      from: this,
      runwayId,
      landingType,
    });
  }

  requestTakeoffPermission(runwayId: string, takeoffType: TakeoffType): void {
    console.log(
      `${this.name} requesting permission to takeoff from runway ${runwayId}. Type of takeoff: ${TakeoffType[takeoffType]}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.Takeoff,
      from: this,
      runwayId,
      takeoffType,
    });
  }

  requestRunwayExitPermission(runwayId: string, direction: Direction): void {
    console.log(
      `${this.name} requesting permission to exit runway ${runwayId}. Direction: ${Direction[direction]}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.RunwayExit,
      from: this,
      runwayId,
      direction,
    });
  }

  requestTaxiToGatePermission(gateId: string, taxiSpeed: TaxiSpeed): void {
    console.log(
      `${this.name} requesting permission to taxi to gate ${gateId}. Taxi speed: ${TaxiSpeed[taxiSpeed]}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.TaxiToGate,
      from: this,
      gateId,
      taxiSpeed,
    });
  }

  requestEngineShutdownPermission(engineId: string): void {
    console.log(
      `${this.name} requesting permission to shutdown engine ${engineId}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.EngineShutdown,
      from: this,
      engineId,
    });
  }

  requestEmergencyLandingPermission(
    runwayId: string,
    emergencyInfo: EmergencyInfo
  ): void {
    console.log(
      `${this.name} requesting emergency landing on runway ${runwayId}. Emergency code: ${emergencyInfo.code}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.EmergencyLanding,
      from: this,
      runwayId,
      emergencyInfo,
    });
  }

  requestRefuelingPermission(fuelInfo: FuelInfo): void {
    console.log(
      `${this.name} requesting refueling. Type of fuel: ${fuelInfo.type}, Amount: ${fuelInfo.amount}`
    );

    this.controlTowerMediator.sendRequestToControlTower({
      type: AirplaneRequestType.Refueling,
      from: this,
      fuelInfo,
    });
  }

  inquireRunwayStatus(runwayId: string, inquiryType: InquiryType): void {
    console.log(
      `${this.name} inquiring runway status for ${runwayId}. Info Type: ${InquiryType[inquiryType]}`
    );

    this.controlTowerMediator.sendInquiryToControlTower({
      type: AirplaneInquiryType.RunwayStatus,
      from: this,
      runwayId,
      inquiryType,
    });
  }

  inquireGateAvailability(gateId: string, inquiryType: InquiryType): void {
    console.log(
      `${this.name} inquiring gate availability for ${gateId}. Info Type: ${InquiryType[inquiryType]}`
    );

    this.controlTowerMediator.sendInquiryToControlTower({
      type: AirplaneInquiryType.GateAvailability,
      from: this,
      gateId,
      inquiryType,
    });
  }

  inquireWeatherCondition(location: string): void {
    console.log(`${this.name} inquiring weather condition for ${location}`);

    this.controlTowerMediator.sendInquiryToControlTower({
      type: AirplaneInquiryType.WeatherCondition,
      from: this,
      location,
    });
  }

  inquireAirTraffic(info: AirTrafficInfo): void {
    console.log(
      `${this.name} inquiring air traffic. Range: ${info.range}, Type: ${info.type}`
    );

    this.controlTowerMediator.sendInquiryToControlTower({
      type: AirplaneInquiryType.AirTraffic,
      from: this,
      info,
    });
  }

  sendResponseToAirplane(response: AirplaneResponse): void {
    switch (response.type) {
      case AirplaneRequestType.Landing:
        this.receiveLandingPermission();
        break;
      case AirplaneRequestType.Takeoff:
        this.receiveTakeoffPermission();
        break;
      case AirplaneRequestType.EmergencyLanding:
        this.receiveEmergencyLandingPermission();
        break;
      case AirplaneRequestType.EngineShutdown:
        this.receiveEngineShutdownPermission();
        break;
      case AirplaneRequestType.Refueling:
        this.receiveRefuelingPermission();
        break;
      case AirplaneRequestType.RunwayExit:
        this.receiveRunwayExitPermission();
        break;
      case AirplaneRequestType.TaxiToGate:
        this.receiveTaxiToGatePermission();
        break;
      default:
        const exhaustiveCheck: never = response;
        throw new Error(`Unrecognized Response Type ${exhaustiveCheck}`);
    }
  }
}
