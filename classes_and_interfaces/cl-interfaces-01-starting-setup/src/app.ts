interface Named {
  readonly name?: string;
  outputName?: string;
}

// function type
type AddFn = (a: number, b: number) => number;
// function interface
interface AddFnInterface {
  (a: number, b: number): number;
}

let add: AddFnInterface;

add = (n1: number, n2: number) => n1 + n2;

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;

  constructor(n: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
}

interface Person {
  name?: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Greetable;

user1 = new Person("Max");

user1.greet("Hello, my name is");
