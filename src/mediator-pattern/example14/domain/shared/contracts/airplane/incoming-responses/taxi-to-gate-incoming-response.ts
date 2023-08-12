export type TaxiToGateSuccessIncomingResponse = {
  message: string;
  success: true;
  gateId: string;
};

export type TaxiToGateFailureIncomingResponse = {
  message: string;
  success: false;
};

export type TaxiToGateIncomingResponse =
  | TaxiToGateSuccessIncomingResponse
  | TaxiToGateFailureIncomingResponse;
