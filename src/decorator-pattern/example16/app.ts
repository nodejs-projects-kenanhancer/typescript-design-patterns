interface WebPage {
  display(): void;
}

interface WebServer {
  listen(host: string, port: number): void;
  use(path: string, webPage: WebPage): WebServer;
  handleRequest(path: string): string;
}

class HomePage implements WebPage {
  display(): void {
    console.log("Welcome to Home Page");
  }
}

class AboutPage implements WebPage {
  display(): void {
    console.log("Welcome to About Page");
  }
}

abstract class WebPageDecorator implements WebPage {
  private readonly webPage: WebPage;

  constructor(webPage: WebPage) {
    this.webPage = webPage;
  }

  display(): void {
    this.webPage.display();
  }
}

class BasicAuthenticatedWebPage extends WebPageDecorator {
  constructor(webPage: WebPage) {
    super(webPage);
  }

  private authenticateUser() {
    console.log("Basic Authentication done");
  }

  display(): void {
    this.authenticateUser();
    super.display();
  }
}

class OpenAuthorizatedWebPage extends WebPageDecorator {
  constructor(webPage: WebPage) {
    super(webPage);
  }

  private authorizeUser() {
    console.log("Open Authorized done");
  }

  display(): void {
    this.authorizeUser();
    super.display();
  }
}

class LoggingWebPage extends WebPageDecorator {
  constructor(webPage: WebPage) {
    super(webPage);
  }

  private logUser() {
    console.log("Logging done");
  }

  display(): void {
    this.logUser();
    super.display();
  }
}

(function () {
  const webServer: WebServer = {
    listen(host: string, port: number) {
      console.log("Listening...");
    },
    use(path, webPage) {
      return this;
    },
    handleRequest(path) {
      return "";
    },
  };

  webServer.listen("localhost", 3000);

  webServer.use("/", new HomePage());

  webServer.use(
    "/about",
    new LoggingWebPage(new BasicAuthenticatedWebPage(new AboutPage()))
  );

  webServer.handleRequest("/about");
})();

export {};
