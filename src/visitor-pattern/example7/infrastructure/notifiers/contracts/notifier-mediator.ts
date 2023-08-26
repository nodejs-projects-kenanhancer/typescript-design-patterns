import { NotificationPayload } from "../payloads";

export interface NotifierMediator<
  T extends NotificationPayload = NotificationPayload
> {
  notify(payload: T): void;
}
