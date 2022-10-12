// Code goes here!
// const names: string[] = ["Max", "Manu"];
// const names2: Array<string> = [];

import { StringIterator } from "cypress/types/lodash";

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("this is done");
//   }, 2000);
// });

// promise.then((data) => {
//   data.split("");
// });

//generic function with generic typed parameters
function merge<T extends object, U extends object>(objA: T, objB: U) {
  //restrict types for T & U

  return Object.assign(objA, objB);
}

//types are dynamically assigned at runtime
const merged = merge<{ name: string }, { age: number }>(
  { name: "test" },
  { age: 2 }
);
console.log(merged);
console.log(merged.age);

interface Lengthy {
  length: number;
}

function countAnDPrint<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements";
  }
  return [element, descriptionText];
}

console.log(countAnDPrint(" Hi There!"));
console.log(countAnDPrint([]));
console.log(countAnDPrint(["sports", "cooking"]));

//the keyof constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value " + obj[key];
}

console.log(extractAndConvert({ name: "test" }, "name"));

//generic class
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}
//use generic class with strings
const textStorage = new DataStorage<string>();

textStorage.addItem("Max");
textStorage.addItem("Manu");

console.log(textStorage);

//use generic class with numbers
const numStorage = new DataStorage<number>();
numStorage.addItem(2);

//passing around new objects just creates new objects (unlike primitives, the values refer to different objects
//not to the same values)
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "MAx" });
// objStorage.addItem({ name: "MAnu" });
// objStorage.removeItem({ name: "MAx" });
// console.log(objStorage);

// generic utility types:

// Partial
interface CourseGoal {
  title: string;
  description: string;
  completeUtil: Date;
}

function createCourseGoul(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUtil = date;

  return courseGoal as CourseGoal;
}

//readonly type
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu");//this throws err
//names.pop()//throws err

//generic vs union types
//union types are more flexible but can cause trouble
