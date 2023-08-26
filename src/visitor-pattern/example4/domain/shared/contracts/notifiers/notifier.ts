import { NotificationPayload } from "./notification-payload";

export interface Notifier<T extends NotificationPayload> {
  notify(payload: T): void;
}
