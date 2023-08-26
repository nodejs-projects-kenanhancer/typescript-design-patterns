export interface SlackPayload {
  type: 'slack';
  channel: string;
  message: string;
}
