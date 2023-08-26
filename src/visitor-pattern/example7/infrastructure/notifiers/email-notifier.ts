import { Notifier } from "./contracts";
import { EmailPayload } from "./payloads";

export class EmailNotifier implements Notifier<EmailPayload> {
  readonly notifierType: "email" = "email";

  notify(payload: EmailPayload): void {
    console.log(
      `Email sent to ${payload.to} with subject "${payload.subject}" and message: "${payload.message}"`
    );
  }
}
