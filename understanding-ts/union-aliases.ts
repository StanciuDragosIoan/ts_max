type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

// union type (number | string)
function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor //this is a union type combined with a literal type
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  // if (resultConversion === "as-number") {
  //   return +result; //convert to number
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);
const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);
const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
