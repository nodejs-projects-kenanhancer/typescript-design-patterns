import { EmailPayload, Notifier } from "./payloads";

export class EmailNotifier implements Notifier<EmailPayload> {
  notify(payload: EmailPayload): void {
    console.log(
      `Email sent to ${payload.to} with subject "${payload.subject}" and message: "${payload.message}"`
    );
  }
}
