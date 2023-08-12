import {
  AirplaneResponseMappingVisitor,
  ControlTowerMediator,
} from "../../../shared/contracts";
import {
  EngineStatus,
  FlightAction,
  LandingGearStatus,
} from "../../../shared/enums";
import {
  AirTrafficStatus,
  AirplaneDimension,
  AirplaneExteriorFeature,
  AirplaneInteriorFeature,
  AirplanePerformance,
  AirplaneSafety,
  AirplaneSpecification,
  AirplaneStatus,
  AirplaneTechnical,
  FlightOperation,
  FuelStatus,
  MaintenanceStatus,
  Position,
  WeatherStatus,
} from "../../../shared/value-objects";
import { BaseAirplane } from "./base-airplane";

export class Boeing extends BaseAirplane {
  private constructor(
    name: string,
    specification: AirplaneSpecification,
    status: AirplaneStatus,
    controlTowerMediator: ControlTowerMediator,
    airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor
  ) {
    super(
      name,
      specification,
      status,
      controlTowerMediator,
      airplaneResponseMappingVisitor
    );
  }

  private static generateBoeing777Spec() {
    const safety = new AirplaneSafety(8, 350, 350);

    const technical = new AirplaneTechnical(
      "turbofan",
      181280,
      2,
      351535,
      95000
    );

    const dimensions = new AirplaneDimension(63.7, 64.8, 18.6);

    const performance = new AirplanePerformance(13650, 905, 950, 13100);

    const interiorFeatures = new AirplaneInteriorFeature(
      396,
      160000,
      396,
      12,
      10
    );

    const exteriorFeatures = new AirplaneExteriorFeature(true, true);

    const specification = new AirplaneSpecification(
      safety,
      technical,
      dimensions,
      performance,
      interiorFeatures,
      exteriorFeatures
    );

    return specification;
  }

  private static generateBoeing737Spec() {
    const safety = new AirplaneSafety(8, 189, 189);

    const technical = new AirplaneTechnical(
      "CFM56-7B27",
      26020, // liters
      2,
      79015, // kg
      27360 // lbf per engine
    );

    const dimensions = new AirplaneDimension(
      39.5, // meters
      35.8, // meters
      12.5 // meters
    );

    const performance = new AirplanePerformance(
      5700, // km
      842, // km/h
      871, // km/h
      12600 // meters
    );

    const interiorFeatures = new AirplaneInteriorFeature(
      189, // passengers
      1624, // cubic feet
      189,
      9, // overhead bins
      3 // lavatories
    );

    const exteriorFeatures = new AirplaneExteriorFeature(
      true, // hasHighIntensityLighting
      true // hasInstrumentLandingSystem
    );

    const specification = new AirplaneSpecification(
      safety,
      technical,
      dimensions,
      performance,
      interiorFeatures,
      exteriorFeatures
    );

    return specification;
  }

  private static generateBoeing747Spec() {
    const safety = new AirplaneSafety(10, 467, 467); // Example values, please verify with the exact model

    const technical = new AirplaneTechnical(
      "GEnx-2B67",
      242470, // liters
      4,
      442253, // kg
      66600 // lbf per engine
    );

    const dimensions = new AirplaneDimension(
      76.3, // meters
      68.4, // meters
      19.4 // meters
    );

    const performance = new AirplanePerformance(
      14815, // km
      913, // km/h
      988, // km/h
      12192 // meters
    );

    const interiorFeatures = new AirplaneInteriorFeature(
      467, // passengers in a typical three-class configuration
      6581, // cubic feet cargo
      467,
      16, // overhead bins (approximate)
      5 // lavatories (approximate)
    );

    const exteriorFeatures = new AirplaneExteriorFeature(
      true, // hasHighIntensityLighting
      true // hasInstrumentLandingSystem
    );

    const specification = new AirplaneSpecification(
      safety,
      technical,
      dimensions,
      performance,
      interiorFeatures,
      exteriorFeatures
    );

    return specification;
  }

  static createBoeing777(
    controlTowerMediator: ControlTowerMediator,
    airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor
  ) {
    const specification = this.generateBoeing777Spec();

    const fuelStatus = new FuelStatus(100000, 181280);
    const position = new Position(47.6062, -122.3321); // Seattle, for example
    const engineStatus = EngineStatus.OFF;
    const flightOperation = new FlightOperation(FlightAction.PARKED);
    const maintenanceStatus = new MaintenanceStatus(
      new Date("2022-01-01"),
      new Date("2022-07-01")
    );
    const airTrafficStatus = new AirTrafficStatus(5);
    const weatherStatus = new WeatherStatus(15, 10, "N", 10);
    const landingGearStatus = LandingGearStatus.DEPLOYED;

    const airplaneStatus = new AirplaneStatus(
      300,
      fuelStatus,
      position,
      engineStatus,
      flightOperation,
      maintenanceStatus,
      airTrafficStatus,
      weatherStatus,
      landingGearStatus
    );

    const boeing777 = new Boeing(
      "Boeing 777",
      specification,
      airplaneStatus,
      controlTowerMediator,
      airplaneResponseMappingVisitor
    );

    return boeing777;
  }

  static createBoeing737(
    controlTowerMediator: ControlTowerMediator,
    airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor
  ) {
    const specification = this.generateBoeing737Spec();

    const fuelStatus = new FuelStatus(50000, 20820); // Approximated values, you should use real data
    const position = new Position(40.7128, -74.006); // New York, as an example
    const engineStatus = EngineStatus.OFF;
    const flightOperation = new FlightOperation(FlightAction.PARKED);
    const maintenanceStatus = new MaintenanceStatus(
      new Date("2021-12-01"),
      new Date("2022-06-01")
    );
    const airTrafficStatus = new AirTrafficStatus(3);
    const weatherStatus = new WeatherStatus(10, 8, "NW", 10);
    const landingGearStatus = LandingGearStatus.DEPLOYED;

    const airplaneStatus = new AirplaneStatus(
      190, // Average seating for a Boeing 737
      fuelStatus,
      position,
      engineStatus,
      flightOperation,
      maintenanceStatus,
      airTrafficStatus,
      weatherStatus,
      landingGearStatus
    );

    const boeing737 = new Boeing(
      "Boeing 737",
      specification, // Modify if you have a different spec for 737
      airplaneStatus,
      controlTowerMediator, // Assuming previous instantiation or mock object
      airplaneResponseMappingVisitor // Assuming previous instantiation or mock object
    );

    return boeing737;
  }

  static createBoeing747(
    controlTowerMediator: ControlTowerMediator,
    airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor
  ) {
    const specification = this.generateBoeing747Spec();

    const fuelStatus = new FuelStatus(150000, 242470); // Example values, you should use real data
    const position = new Position(51.5074, -0.1278); // London, as an example
    const engineStatus = EngineStatus.OFF;
    const flightOperation = new FlightOperation(FlightAction.PARKED);
    const maintenanceStatus = new MaintenanceStatus(
      new Date("2022-01-01"),
      new Date("2022-07-01")
    );
    const airTrafficStatus = new AirTrafficStatus(5);
    const weatherStatus = new WeatherStatus(15, 5, "SW", 10);
    const landingGearStatus = LandingGearStatus.DEPLOYED;

    const airplaneStatus = new AirplaneStatus(
      467, // Seating for a Boeing 747-8
      fuelStatus,
      position,
      engineStatus,
      flightOperation,
      maintenanceStatus,
      airTrafficStatus,
      weatherStatus,
      landingGearStatus
    );

    const boeing747 = new Boeing(
      "Boeing 747-8",
      specification, // Generated earlier
      airplaneStatus,
      controlTowerMediator, // Assuming previous instantiation or mock object
      airplaneResponseMappingVisitor // Assuming previous instantiation or mock object
    );

    return boeing747;
  }
}
