export enum AirplaneStatus {
  Idle = "Idle", // The airplane is currently idle, i.e., not in service
  Taxiing = "Taxiing", // The airplane is moving on the ground under its own power
  TakingOff = "Taking Off", // The airplane is in the process of taking off
  Flying = "Flying", // The airplane is in flight
  Landing = "Landing", // The airplane is in the process of landing
  Parked = "Parked", // The airplane is parked
  Refueling = "Refueling", // The airplane is in the process of refueling
  Maintenance = "Maintenance", // The airplane is undergoing maintenance
  Emergency = "Emergency", // The airplane is dealing with an emergency
  Grounded = "Grounded", // The airplane is on the ground and not in service
  PreparingForDescent = "PreparingForDescent",
  AligningForLanding = "AligningForLanding",
}
