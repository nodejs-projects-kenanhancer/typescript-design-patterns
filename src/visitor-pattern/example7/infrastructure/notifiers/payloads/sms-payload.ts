export interface SMSPayload {
  type: "sms";
  phoneNumber: string;
  message: string;
}
