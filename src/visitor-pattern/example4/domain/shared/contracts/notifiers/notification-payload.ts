import { EmailPayload } from "./email-payload";
import { PushNotificationPayload } from "./push-notification-payload";
import { SlackPayload } from "./slack-payload";
import { SMSPayload } from "./sms-payload";

export type NotificationPayload =
  | SlackPayload
  | EmailPayload
  | SMSPayload
  | PushNotificationPayload;
