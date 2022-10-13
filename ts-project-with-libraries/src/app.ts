// Code goes here!
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

function searchAddressHandler(event: Event) {
  event.preventDefault;
  const enteredAddress = addressInput.ariaValueMax;

  //send this to google API
}

form.addEventListener("submit", searchAddressHandler);
