export interface EmailPayload {
  type: 'email';
  to: string;
  subject: string;
  message: string;
}
