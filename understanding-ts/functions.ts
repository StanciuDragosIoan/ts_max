//we can set the type, but if not needed, we can just let TS infer it
function add(n1: number, n2: number): number {
  return n1 + n2;
}

// void return type (function does not return anything)
function printResult(n: number): void {
  console.log("Result " + n);
}

// in vanilla JS, a function that does not return anything, returns by default undefined (which is a real value in JS)
let testVal: undefined; // in TS undefined is a type
printResult(add(1, 5));

// let combinedValues; //no type (line 20 will pass compilation and break at runtime)
// let combinedValues: Function; //generic type
let combinedValues: (n1: number, n2: number) => number; // function type (describe params + return)

combinedValues = add;
// combinedValues = 5; //this passes compilation but will break at runtime
// combinedValues = printResult;
console.log(combinedValues(2, 3));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(1, 2, (result) => console.log(result));
