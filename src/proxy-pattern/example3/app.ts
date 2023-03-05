interface WebServer {
  handleRequest(path: string, method: string): string;
}

class NginxWebServer implements WebServer {
  private readonly host: string;
  private readonly port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  handleRequest(path: string, method: string) {
    const url = `http://${this.host}:${this.port}/${path}`;

    return `request url is ${url}`;
  }
}

class ProxyWebServer implements WebServer {
  private readonly host: string;
  private readonly port: number;
  private webServer!: WebServer;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  handleRequest(path: string, method: string) {
    if (!this.webServer) {
      this.webServer = new NginxWebServer(this.host, this.port);
    }

    return this.webServer.handleRequest(path, method);
  }
}

(function () {
  const webServer: WebServer = new ProxyWebServer("127.0.0.1", 3000);

  webServer.handleRequest("/app/status", "Get");
})();
