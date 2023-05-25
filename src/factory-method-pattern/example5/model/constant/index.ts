export * from "./continents";
export * from "./countries";
export * from "./languages";
export * from "./roles";

export const VEHICLE_TYPES = [
  "Car",
  "Van",
  "Caravan",
  "Truck",
  "Motorbike",
  "Bike",
] as const;

export const MAINTENANCE_STATUS = [
  "Good",
  "Excellent",
  "Fair",
  "Needs Maintenance",
  "Critical",
] as const;

export const COLOR = [
  "Red",
  "Green",
  "Blue",
  "Black",
  "Yellow",
  "White",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
] as const;

export const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Electric",
  "Petrol Hybrid",
  "Diesel Hybrid",
  "Petrol Plug-in Hybrid",
  "Diesel Plug-in Hybrid",
  "None",
] as const;

export const SHAPE_TYPES = [
  "Circle",
  "Rectangle",
  "Triangle",
  "Square",
  "Ellipse",
] as const;
