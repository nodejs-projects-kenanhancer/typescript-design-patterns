import { Notifier } from "./contracts";
import { SlackPayload } from "./payloads";

export class SlackNotifier implements Notifier<SlackPayload> {
  readonly notifierType: "slack" = "slack";

  notify(payload: SlackPayload): void {
    console.log(
      `Message sent to Slack channel ${payload.channel}: ${payload.message}`
    );
  }
}
