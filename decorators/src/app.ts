//decorators are added to a class

// a decorator is a function applied to our class

//regualr decorator
// function Logger(constructor: Function) {
//   console.log("Logging");
//   console.log(constructor); //note this runs when the class is defined (not instantiated)
// }

//decorator factory
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor); //note this runs when the class is defined (not instantiated)
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("WithTemplate FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //return new constructor function or class
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("SOME LOGGING")
@WithTemplate("<h1>Logging Person</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creaing Person");
  }
}

const pers = new Person();

console.log(pers);

// ---

function Log(target: any, propertyName: string) {
  console.log("Property decorator ");
  console.log(target, propertyName);
}

//target is the prototype (if we deal with an instance accessor) or the constructor (if we deal with a static accessor)
//proeprty decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("ACCESSOR DECORATOR");
  console.log(target);
  console.log(name);
  console.log(descriptor);

  return {};
}

//method decorator
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("METHOD DECORATOR");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

//param decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("PARAMETER DECORATOR");
  console.log(target);
  console.log(name);
  console.log(position);
}
class Product {
  // property decorator
  @Log
  title: string;
  private _price: number;

  //accessor decorator
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p2 = new Product("test", 2);
console.log(p2);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = "This works!";
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const button = document.querySelector("button")!;

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          //   return !!obj[prop];
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          //   return obj[prop] > 0;
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

const p = new Printer();

// button.addEventListener("click", p.showMessage.bind(p));
button.addEventListener("click", p.showMessage);

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value; //convert to number

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("please try again");
    return;
  }
  console.log(createdCourse);
});
