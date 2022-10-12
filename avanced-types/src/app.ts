// Code goes here!
type Admin = {
  name: string;
  priviledges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type EleveatedEmployee = Admin & Employee; // works with interfaces too

const e1: EleveatedEmployee = {
  name: "Max",
  priviledges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number; // intersect

type Numeric = number | boolean; // intersect

type Universal = Combinable & Numeric; //combine

function add(a: Combinable, b: Combinable) {
  //type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name " + emp.name);
  if ("priviledges" in emp) {
    console.log("Privileges " + emp.priviledges);
  }

  if ("startDate" in emp) {
    console.log("startDate " + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }

  loadCargo(amount: number) {
    console.log("Loading a cargo " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //typeGuard with 'in'
  //   if ("loadCargo" in vehicle) {
  //     vehicle.loadCargo(1000);
  //   }

  //typeGuard with instanceof
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

//discriminated union
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  //   if ("flyingSpeed" in animal) {
  //     console.log("Moving with speed " + animal.flyingSpeed);
  //   }
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }

  console.log("Moving at speed " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 2000 });

const paragraph = document.querySelector("p");
const paragraphEl = document.getElementById("message-output");
//type casting
// const userInputElement = <HTMLInputElement>document.getElementById("myInput")!;
const userInputElement = (<HTMLInputElement>(
  document.getElementById("myInput")
)) as HTMLInputElement;

userInputElement.value = "hi";

//index types
interface ErrorContainer {
  [prop: string]: string; //every property must be a string and the value must also be a string
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with capital char",
};

//function overload (enforces the return type more explicitly)
function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: Combinable, b: Combinable) {
  //type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result = add2("Max", " Schwarz");
const result2 = result.split(" ");

//optional chaining
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: {
    title: "CEO",
    description: "My Own Company",
  },
};

// console.log(fetchedUserData?.job?.title);

//nullish coalescence
const userInput = null;

// const storedData = userInput || "DEFAULT";
const storedData = userInput ?? "DEFAULT";
