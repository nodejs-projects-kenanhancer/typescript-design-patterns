// Composition : Since Engine is part-of Car, relationship between them is Composition.

// Composition means mandatory

class Engine {
  constructor(public type: string) {}
}

class Car {
  constructor(private readonly engine: Engine) {}
}

// Aggregation : Since Organization has Person as employees, relationship between them is Aggregation

// Aggregation means optional

class Person {
  constructor(public name: string) {}
}

class Organization {
  constructor(private employees: Person[]) {}
}
