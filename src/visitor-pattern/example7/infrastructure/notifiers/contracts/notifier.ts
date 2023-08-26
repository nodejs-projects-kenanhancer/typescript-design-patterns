import { NotificationPayload } from "../payloads";

export interface Notifier<T extends NotificationPayload = NotificationPayload> {
  readonly notifierType: T["type"];

  notify(payload: T): void;
}
