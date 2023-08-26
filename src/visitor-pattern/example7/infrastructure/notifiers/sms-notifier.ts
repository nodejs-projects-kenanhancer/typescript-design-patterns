import { Notifier } from "./contracts";
import { SMSPayload } from "./payloads";

export class SMSNotifier implements Notifier<SMSPayload> {
  readonly notifierType: "sms" = "sms";

  notify(payload: SMSPayload): void {
    console.log(
      `SMS sent to ${payload.phoneNumber} with message: "${payload.message}"`
    );
  }
}
