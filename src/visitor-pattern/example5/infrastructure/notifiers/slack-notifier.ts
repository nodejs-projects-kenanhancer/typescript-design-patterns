import { Notifier, SlackPayload } from "./payloads";

export class SlackNotifier implements Notifier<SlackPayload> {
  notify(payload: SlackPayload): void {
    console.log(
      `Message sent to Slack channel ${payload.channel}: ${payload.message}`
    );
  }
}
