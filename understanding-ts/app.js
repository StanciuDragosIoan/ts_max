var userInput;
var userName;
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
    //this check makes it work with unknown
    userName = userInput; //throws error if userInput type is unknown (works with any)
}
function generateError(msg, errCode) {
    throw {
        msg: msg,
        errorCode: errCode
    };
}
var result = generateError("error occurred", 500);
console.log(result);
