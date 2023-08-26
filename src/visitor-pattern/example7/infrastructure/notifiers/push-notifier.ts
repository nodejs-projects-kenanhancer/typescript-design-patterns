import { Notifier } from "./contracts";
import { PushNotificationPayload } from "./payloads";

export class PushNotifier implements Notifier<PushNotificationPayload> {
  readonly notifierType: "pushNotification" = "pushNotification";

  notify(payload: PushNotificationPayload): void {
    console.log(
      `Push notification sent to device with token ${payload.deviceToken} with message: "${payload.message}"`
    );
  }
}
