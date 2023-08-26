import { Notifier, PushNotificationPayload } from "../../shared/contracts";

export class PushNotifier implements Notifier<PushNotificationPayload> {
  notify(payload: PushNotificationPayload): void {
    console.log(
      `Push notification sent to device with token ${payload.deviceToken} with message: "${payload.message}"`
    );
  }
}
