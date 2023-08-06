export class FlightPlan {
  departure: string; // ICAO code of departure airport
  destination: string; // ICAO code of destination airport
  alternate: string; // ICAO code of alternate airport
  route: string; // flight plan route
  departureTime: Date; // planned departure time
  arrivalTime: Date; // estimated arrival time
}
