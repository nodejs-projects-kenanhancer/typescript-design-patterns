import { AirplaneRequestType } from "../../../enums";

export type TaxiToGateSuccessIncomingResponse = {
  type: AirplaneRequestType.TaxiToGate;
  message: string;
  success: true;
  gateId: string;
};

export type TaxiToGateFailureIncomingResponse = {
  type: AirplaneRequestType.TaxiToGate;
  message: string;
  success: false;
};

export type TaxiToGateIncomingResponse =
  | TaxiToGateSuccessIncomingResponse
  | TaxiToGateFailureIncomingResponse;
