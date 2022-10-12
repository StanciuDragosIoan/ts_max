let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
  //this check makes it work with unknown
  userName = userInput; //throws error if userInput type is unknown (works with any)
}

//this function returns never (because it never returns anything)
function generateError(msg: string, errCode: number): never {
  throw {
    msg,
    errorCode: errCode,
  };
  //while(true){} //infinite loop
}

const result = generateError("error occurred", 500);
console.log(result);
