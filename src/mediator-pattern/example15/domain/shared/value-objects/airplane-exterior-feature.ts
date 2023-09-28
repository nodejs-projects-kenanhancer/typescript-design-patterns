export class AirplaneExteriorFeature {
  hasHighIntensityLighting: boolean;
  hasInstrumentLandingSystem: boolean;

  constructor(
    hasHighIntensityLighting: boolean,
    hasInstrumentLandingSystem: boolean
  ) {
    this.hasHighIntensityLighting = hasHighIntensityLighting;
    this.hasInstrumentLandingSystem = hasInstrumentLandingSystem;
  }
}
