interface Filter {
  handle(value: string): string;
}

class TrimFilter implements Filter {
  handle(value: string): string {
    return value.trim();
  }
}

class NullFilter implements Filter {
  handle(value: string): string {
    return value ?? "";
  }
}

class LowerCaseFilter implements Filter {
  handle(value: string): string {
    return value.toLowerCase();
  }
}

class UpperCaseFilter implements Filter {
  handle(value: string): string {
    return value.toUpperCase();
  }
}

class InputElement {
  private readonly filters: Filter[] = [];
  private _value: string;

  private filter(value: string) {
    for (const filter of this.filters) {
      value = filter.handle(value);
    }

    return value;
  }

  addFilter(filter: Filter) {
    this.filters.push(filter);
  }

  set value(value: string) {
    this._value = this.filter(value);
  }

  get value() {
    return this._value;
  }
}

// Client
class MediatorClient {
  static main() {
    const input = new InputElement();

    input.addFilter(new NullFilter());
    input.addFilter(new TrimFilter());
    input.addFilter(new LowerCaseFilter());

    input.value = "    HeLLO WorLD  ";

    input.addFilter(new UpperCaseFilter());

    input.value = "    HeLLO WorLD  ";
  }
}

MediatorClient.main();

export {};
