import { Notifier, NotifierMediator } from "./contracts";
import { NotificationPayload } from "./payloads";

export class NotificationMediator implements NotifierMediator {
  private notifiers: Notifier[] = [];

  registerNotifier(notifier: Notifier) {
    this.notifiers.push(notifier);
  }

  notify(payload: NotificationPayload): void {
    const notifier = this.notifiers.find(
      (item) => item.notifierType === payload.type
    );

    if (!notifier) {
      throw new Error(`Unrecognized Payload Type ${payload.type}`);
    }

    notifier.notify(payload);
  }
}
