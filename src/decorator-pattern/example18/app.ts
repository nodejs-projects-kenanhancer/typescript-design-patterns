interface Notifier {
  send(message: string): void;
}

class BaseMessageNotifier implements Notifier {
  send(message: string): void {
    console.log("Sending message: " + message);
  }
}

abstract class NotifierDecorator implements Notifier {
  protected readonly notifier: Notifier;

  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  send(message: string) {
    this.notifier.send(message);
  }
}

class EmailNotifierDecorator extends NotifierDecorator {
  constructor(notifier: Notifier) {
    super(notifier);
  }

  send(message: string) {
    super.send(message);

    console.log("Sending Message via Email: " + message);
  }
}

class SmsNotifierDecorator extends NotifierDecorator {
  constructor(notifier: Notifier) {
    super(notifier);
  }

  send(message: string) {
    super.send(message);

    console.log("Sending Message via SMS: " + message);
  }
}

class SlackNotifierDecarator extends NotifierDecorator {
  constructor(notifier: Notifier) {
    super(notifier);
  }

  send(message: string) {
    super.send(message);

    console.log("Sending Message view Slack: " + message);
  }
}

class WhatsAppNotificationDecorator extends NotifierDecorator {
  constructor(notifier: Notifier) {
    super(notifier);
  }

  send(message: string): void {
    super.send(message);

    console.log("Sending Message view WhatsApp: " + message);
  }
}

(function () {
  const notifier = new EmailNotifierDecorator(
    new SmsNotifierDecorator(
      new SlackNotifierDecarator(
        new WhatsAppNotificationDecorator(new BaseMessageNotifier())
      )
    )
  );

  notifier.send("Hello world!");
})();

export {};
