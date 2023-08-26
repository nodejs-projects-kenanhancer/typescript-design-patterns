import { Notifier, SMSPayload } from "../../shared/contracts";

export class SMSNotifier implements Notifier<SMSPayload> {
  notify(payload: SMSPayload): void {
    console.log(
      `SMS sent to ${payload.phoneNumber} with message: "${payload.message}"`
    );
  }
}
