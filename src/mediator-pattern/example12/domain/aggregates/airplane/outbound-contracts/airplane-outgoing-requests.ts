export interface AirplaneOutgoingRequests {
  requestTaxi(): void;

  requestRefuel(): void;

  requestLanding(): void;

  requestTakeoff(): void;

  requestAirTraffic(): void;

  requestEmergencyLand(): void;

  requestRunwayCondition(): void;

  requestWeatherCondition(): void;
}
