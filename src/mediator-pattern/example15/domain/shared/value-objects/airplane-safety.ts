export class AirplaneSafety {
  emergencyExitsCount: number;
  lifeVestsCount: number;
  oxygenMasksCount: number;

  constructor(
    emergencyExitsCount: number,
    lifeVestsCount: number,
    oxygenMasksCount: number
  ) {
    this.emergencyExitsCount = emergencyExitsCount;
    this.lifeVestsCount = lifeVestsCount;
    this.oxygenMasksCount = oxygenMasksCount;
  }
}
