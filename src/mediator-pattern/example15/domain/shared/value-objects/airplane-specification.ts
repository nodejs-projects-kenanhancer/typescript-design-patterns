import {
  AirplaneDimension,
  AirplaneExteriorFeature,
  AirplaneInteriorFeature,
  AirplanePerformance,
  AirplaneSafety,
  AirplaneTechnical,
} from ".";

export class AirplaneSpecification {
  safety: AirplaneSafety;
  technical: AirplaneTechnical;
  dimensions: AirplaneDimension;
  performance: AirplanePerformance;
  interiorFeatures: AirplaneInteriorFeature;
  exteriorFeatures: AirplaneExteriorFeature;

  constructor(
    safety: AirplaneSafety,
    technical: AirplaneTechnical,
    dimensions: AirplaneDimension,
    performance: AirplanePerformance,
    interiorFeatures: AirplaneInteriorFeature,
    exteriorFeatures: AirplaneExteriorFeature
  ) {
    safety = safety;
    technical = technical;
    dimensions = dimensions;
    performance = performance;
    interiorFeatures = interiorFeatures;
    exteriorFeatures = exteriorFeatures;
  }
}
