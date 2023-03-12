interface Middleware {
  execute(event: Record<string, any>): Middleware | string;
}

class GreetingMiddleware implements Middleware {
  execute(event: Record<string, any>): Middleware | string {
    return "Hello World!";
  }
}

abstract class MiddlewareDecorator implements Middleware {
  protected readonly middleware: Middleware;

  constructor(middleware: Middleware) {
    this.middleware = middleware;
  }

  execute(event: Record<string, any>): Middleware | string {
    return this.middleware.execute(event);
  }
}

class ErrorMiddlewareDecorator extends MiddlewareDecorator {
  constructor(middleware: Middleware) {
    super(middleware);
  }

  execute(event: Record<string, any>) {
    let result: Middleware | string;

    try {
      result = super.middleware.execute(event);
    } catch (error) {
      console.error("ERROR:", error);

      throw error;
    }

    return result;
  }
}

class CorsMiddlewareDecorator extends MiddlewareDecorator {
  constructor(middleware: Middleware) {
    super(middleware);
  }

  execute(event: Record<string, any>) {
    // Do something before executing next decorator
    const result = super.middleware.execute(event);
    // Do something after executing next decorator

    return result;
  }
}

class LoggingMiddlewareDecorator extends MiddlewareDecorator {
  constructor(middleware: Middleware) {
    super(middleware);
  }

  execute(event: Record<string, any>) {
    // Do something before executing next decorator
    const result = super.middleware.execute(event);
    // Do something after executing next decorator

    return result;
  }
}

class TimingMiddlewareDecorator extends MiddlewareDecorator {
  constructor(middleware: Middleware) {
    super(middleware);
  }

  execute(event: Record<string, any>) {
    // Do something before executing next decorator
    const result = super.middleware.execute(event);
    // Do something after executing next decorator

    return result;
  }
}

class JsonBodyParserMiddlewareDecorator extends MiddlewareDecorator {
  constructor(middleware: Middleware) {
    super(middleware);
  }

  execute(event: Record<string, any>) {
    // Do something before executing next decorator
    const result = super.middleware.execute(event);
    // Do something after executing next decorator

    return result;
  }
}

(function () {
  const greetingMiddleware = new ErrorMiddlewareDecorator(
    new CorsMiddlewareDecorator(
      new LoggingMiddlewareDecorator(
        new TimingMiddlewareDecorator(
          new JsonBodyParserMiddlewareDecorator(new GreetingMiddleware())
        )
      )
    )
  );

  const result = greetingMiddleware.execute({
    firstName: "Kenan",
    lastName: "Hancer",
  });

  console.log(result);
})();

export {};
