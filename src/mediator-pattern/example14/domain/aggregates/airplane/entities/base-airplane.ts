import {
  Airplane,
  AirplaneMediator,
  AirplaneOutgoingRequests,
  AirplaneResponse,
  AirplaneResponseMappingVisitor,
  ControlTowerMediator,
  EmergencyLandingIncomingResponse,
  EngineRefuelingIncomingResponse,
  EngineShutdownIncomingResponse,
  LandingIncomingResponse,
  RunwayExitIncomingResponse,
  TakeoffIncomingResponse,
  TaxiToGateIncomingResponse,
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
  private readonly airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor;

  constructor(
    name: string,
    specification: AirplaneSpecification,
    status: AirplaneStatus,
    controlTowerMediator: ControlTowerMediator,
    airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor
  ) {
    this.name = name;
    this.specification = specification;
    this.status = status;
    this.controlTowerMediator = controlTowerMediator;
    this.airplaneResponseMappingVisitor = airplaneResponseMappingVisitor;
  }

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
    if (!response.success) {
      console.error(response.message);
      return;
    }

    switch (response.type) {
      case AirplaneRequestType.Landing:
        const landingIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveLandingPermission(landingIncomingResponse);
        break;
      case AirplaneRequestType.Takeoff:
        const takeoffIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveTakeoffPermission(takeoffIncomingResponse);
        break;
      case AirplaneRequestType.EmergencyLanding:
        const emergencyLandingIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveEmergencyLandingPermission(
          emergencyLandingIncomingResponse
        );
        break;
      case AirplaneRequestType.EngineShutdown:
        const engineShutdownIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveEngineShutdownPermission(engineShutdownIncomingResponse);
        break;
      case AirplaneRequestType.Refueling:
        const engineRefuelingIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveRefuelingPermission(engineRefuelingIncomingResponse);
        break;
      case AirplaneRequestType.RunwayExit:
        const runwayExitIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveRunwayExitPermission(runwayExitIncomingResponse);
        break;
      case AirplaneRequestType.TaxiToGate:
        const taxiToGateIncomingResponse = response.accept(
          this.airplaneResponseMappingVisitor
        );

        this.receiveTaxiToGatePermission(taxiToGateIncomingResponse);
        break;
      default:
        const exhaustiveCheck: never = response;
        throw new Error(`Unrecognized Response Type ${exhaustiveCheck}`);
    }
  }

  private receiveLandingPermission(
    landingIncomingResponse: LandingIncomingResponse
  ): void {
    if (!landingIncomingResponse.success) {
      console.error(landingIncomingResponse.message);
      return;
    }

    const { runway } = landingIncomingResponse;

    console.log(`${this.name} received landing permission on ${runway.name}`);
  }

  private receiveTakeoffPermission(
    takeoffIncomingResponse: TakeoffIncomingResponse
  ): void {
    if (!takeoffIncomingResponse.success) {
      console.error(takeoffIncomingResponse.message);
      return;
    }

    const { runway, takeoffType } = takeoffIncomingResponse;

    console.log(
      `${this.name} received takeoff permission for ${TakeoffType[takeoffType]} on ${runway.name}`
    );
  }

  private receiveEmergencyLandingPermission(
    emergencyLandingIncomingResponse: EmergencyLandingIncomingResponse
  ): void {
    if (!emergencyLandingIncomingResponse.success) {
      console.error(emergencyLandingIncomingResponse.message);
      return;
    }

    const { runway } = emergencyLandingIncomingResponse;

    console.log(
      `${this.name} received emergency landing permission on ${runway.name}`
    );
  }

  private receiveEngineShutdownPermission(
    engineShutdownIncomingResponse: EngineShutdownIncomingResponse
  ): void {
    if (!engineShutdownIncomingResponse.success) {
      console.error(engineShutdownIncomingResponse.message);
      return;
    }

    const { engineId } = engineShutdownIncomingResponse;

    console.log(`${this.name} shut down engine ${engineId}`);
  }

  private receiveRefuelingPermission(
    engineRefuelingIncomingResponse: EngineRefuelingIncomingResponse
  ): void {
    if (!engineRefuelingIncomingResponse.success) {
      console.error(engineRefuelingIncomingResponse.message);
      return;
    }

    const { fuelInfo } = engineRefuelingIncomingResponse;

    console.log(
      `${
        this.name
      } received refuel permission and fuel info is ${JSON.stringify(fuelInfo)}`
    );
  }

  private receiveRunwayExitPermission(
    runwayExitIncomingResponse: RunwayExitIncomingResponse
  ): void {
    if (!runwayExitIncomingResponse.success) {
      console.error(runwayExitIncomingResponse.message);
      return;
    }

    const { direction } = runwayExitIncomingResponse;

    console.log(
      `${this.name} received ${Direction[direction]} runway exit permission.`
    );
  }

  private receiveTaxiToGatePermission(
    taxiToGateIncomingResponse: TaxiToGateIncomingResponse
  ): void {
    if (!taxiToGateIncomingResponse.success) {
      console.error(taxiToGateIncomingResponse.message);
      return;
    }

    const { gateId } = taxiToGateIncomingResponse;

    console.log(`${this.name} received taxi to gate ${gateId} permission.`);
  }
}
