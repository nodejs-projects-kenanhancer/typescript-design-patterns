export interface PushNotificationPayload {
  type: 'pushNotification';
  deviceToken: string;
  message: string;
}
