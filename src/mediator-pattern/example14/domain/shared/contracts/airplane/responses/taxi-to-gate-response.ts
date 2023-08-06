import { AirplaneRequestType } from "../../../enums";

type TaxiToGateSuccessResponse = {
  type: AirplaneRequestType.TaxiToGate;
  message: string;
  success: true;
  gateId: string;
};

type TaxiToGateFailureResponse = {
  type: AirplaneRequestType.TaxiToGate;
  message: string;
  success: false;
};

export type TaxiToGateResponse =
  | TaxiToGateSuccessResponse
  | TaxiToGateFailureResponse;
