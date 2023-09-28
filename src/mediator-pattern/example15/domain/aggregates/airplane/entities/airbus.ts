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

export class Airbus extends BaseAirplane {
  constructor(
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

  private static generateAirbusA380Spec() {
    const safety = new AirplaneSafety(16, 853, 853); // Example values

    const technical = new AirplaneTechnical(
      "Trent 970/B",
      320000, // liters
      4,
      560000, // kg
      70000 // lbf per engine
    );

    const dimensions = new AirplaneDimension(
      72.7, // meters
      79.8, // meters
      24.1 // meters
    );

    const performance = new AirplanePerformance(
      15200, // km
      903, // km/h
      945, // km/h
      13100 // meters
    );

    const interiorFeatures = new AirplaneInteriorFeature(
      853, // passengers in a typical two-class configuration
      5600, // cubic feet cargo
      853,
      20, // overhead bins (approximate)
      10 // lavatories (approximate)
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

  static createAirbusA380(
    controlTowerMediator: ControlTowerMediator,
    airplaneResponseMappingVisitor: AirplaneResponseMappingVisitor
  ) {
    const specification = this.generateAirbusA380Spec();

    const fuelStatus = new FuelStatus(200000, 320000); // Example values
    const position = new Position(48.8566, 2.3522); // Paris, as an example
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
      853, // Seating for an Airbus A380-800
      fuelStatus,
      position,
      engineStatus,
      flightOperation,
      maintenanceStatus,
      airTrafficStatus,
      weatherStatus,
      landingGearStatus
    );

    const airbusA380 = new Airbus(
      "Airbus A380-800",
      specification,
      airplaneStatus,
      controlTowerMediator, // Assuming previous instantiation or mock object
      airplaneResponseMappingVisitor // Assuming previous instantiation or mock object
    );

    return airbusA380;
  }
}
