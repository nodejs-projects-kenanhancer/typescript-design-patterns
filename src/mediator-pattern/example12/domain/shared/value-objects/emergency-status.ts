import { EmergencyCode } from "../enums";

export type EmergencyStatus = {
  emergencyCode: EmergencyCode;
  description: string; // e.g., "Engine failure", "Medical emergency", etc.
  details?: string; // optional field for any additional info
};
