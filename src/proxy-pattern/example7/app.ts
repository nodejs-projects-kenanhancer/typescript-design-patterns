/*

Suppose you have an interface Internet that represents the ability to connect to the internet, 
and a class RealInternet that implements this interface and provides the actual internet connection.

Suppose you want to add a security layer to the internet connection by checking 
if the server being accessed is allowed or not. In this scenario, you can use a Proxy to 
implement the security logic in a separate class, without modifying the RealInternet class.

This approach can be useful for implementing cross-cutting concerns in your application 
without modifying the existing classes, and for providing a level of indirection that allows 
you to change the implementation of a class without affecting the clients that use it.

*/

interface Internet {
  connectTo(host: string): void;
}

class RealInternet implements Internet {
  connectTo(host: string): void {
    console.log(`Connection to ${host}`);
  }
}

class InternetProxy implements Internet {
  private internet!: Internet;
  private static bannedSites = [
    "www.example.com",
    "www.someothersite.com",
    "www.yetanothersite.com",
  ];

  connectTo(host: string): void {
    if (!this.internet) {
      this.internet = new RealInternet();
    }

    if (InternetProxy.bannedSites.includes(host.toLowerCase())) {
      throw new Error("Access Denied");
    }

    this.internet.connectTo(host);
  }
}

(function () {
  const internet: Internet = new InternetProxy();

  internet.connectTo("www.google.com"); // This should succeed

  internet.connectTo("www.example.com"); // This should fail and throw an exception
})();
