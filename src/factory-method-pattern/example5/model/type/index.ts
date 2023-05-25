import {
  COLOR,
  FUEL_TYPES,
  MAINTENANCE_STATUS,
  SHAPE_TYPES,
  VEHICLE_TYPES,
} from "../constant";

export type * from "../constant";

export type * from "./field-decorator";

export type * from "./validation";

export type FieldsOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

export type ToDTO<T> = Omit<T, FieldsOfType<T, object>>;

export type Color = (typeof COLOR)[number];

export type FuelType = (typeof FUEL_TYPES)[number];

export type VehicleType = (typeof VEHICLE_TYPES)[number];

export type MaintenanceStatusType = (typeof MAINTENANCE_STATUS)[number];

export type ShapeType = (typeof SHAPE_TYPES)[number];

export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Weekend = Extract<Days, "Saturday" | "Sunday">;
