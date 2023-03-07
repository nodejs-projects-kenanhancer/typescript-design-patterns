interface WebPage {
  display(): void;
}

class BasicWebPage implements WebPage {
  display(): void {
    console.log("Basic WEB page");
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

class AuthenticatedWebPage extends WebPageDecorator {
  constructor(webPage: WebPage) {
    super(webPage);
  }

  private authenticateUser() {
    console.log("authentification done");
  }

  display(): void {
    this.authenticateUser();
    super.display();
  }
}

class AuthorizedWebPage extends WebPageDecorator {
  constructor(webPage: WebPage) {
    super(webPage);
  }

  private authorizeUser() {
    console.log("authorized done");
  }

  display(): void {
    this.authorizeUser();
    super.display();
  }
}

(function () {
  const myPage = new AuthorizedWebPage(
    new AuthenticatedWebPage(new BasicWebPage())
  );

  myPage.display();
})();

export {};
