import {
  AirplaneDimension,
  AirplaneExteriorFeature,
  AirplaneInteriorFeature,
  AirplanePerformance,
  AirplaneSafety,
  AirplaneTechnical,
} from "../value-objects";

export class AirplaneSpecification {
  safety: AirplaneSafety;
  technical: AirplaneTechnical;
  dimensions: AirplaneDimension;
  performance: AirplanePerformance;
  interiorFeatures: AirplaneInteriorFeature;
  exteriorFeatures: AirplaneExteriorFeature;
}
