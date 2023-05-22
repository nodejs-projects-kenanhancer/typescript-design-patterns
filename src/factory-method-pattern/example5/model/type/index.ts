import { COLOR, FUEL_TYPES, SHAPE_TYPES, VEHICLE_TYPES } from "../constant";

export type * from "../constant";

export type Color = (typeof COLOR)[number];

export type FuelType = (typeof FUEL_TYPES)[number];

export type VehicleType = (typeof VEHICLE_TYPES)[number];

export type ShapeType = (typeof SHAPE_TYPES)[number];
