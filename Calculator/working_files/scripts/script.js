const buttons = document.querySelectorAll(".button");
const bigDisplay = document.querySelector(".big-letters p");
const smallDisplay = document.querySelector(".small-letters p");

let numbers = [];
let result = [];
let ans = [];

//Click Event for Buttons
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    switch(button.dataset.key) {
      case "9":
      case "8":
      case "7":
      case "6":
      case "5":
      case "4":
      case "3":
      case "2":
      case "1":
      case "0":
      case ".":
      case " + ":
      case " - ":
      case " * ":
      case " / ":
        checkResult(button);
        break;
      case "X":
        deleteLast();
        break;
      case "CE":
        clearAll();
        break;
      case " = ":
        answer();
        break;
    };
  });
});

//Display the Result
function answer() {
  //Error if start of numbersArray is an operator
  if (numbers[0] == (" + ") || numbers[0] == (" - ") || numbers[0] == (" * ") || numbers[0] == (" / ")) {
    bigDisplay.textContent = "Error";
  } else {
      //Answer
      const answer = eval(numbers.toString().replace(/,/g, ""));

      //Answer with three decimals
      const round = Math.round(answer * 1000) / 1000;
      result.push(round);
      bigDisplay.textContent = result;

      //Numbers to smallDisplay
      const numbersTwo = numbers.toString().replace(/,/g, "");
      smallDisplay.textContent = `${numbersTwo} =`;
  }
}

//Delete the last entry of the numbersArray
function deleteLast() {
  const str = numbers.pop();
  bigDisplay.textContent = numbers.toString().replace(/,/g, "");
}

//Clear all array's and display's
function clearAll() {
  numbers.length = [];
  result.length = [];
  ans.length = [];
  bigDisplay.textContent = " ";
  smallDisplay.textContent = " ";
}

//Check if there is an answer in resultArray
function checkResult(input) {
  let str = result.toString();
  let num = input.dataset.key;
  let button = input.dataset.key;

  //Check if input is an number or operator
  if(str.match(/[0-9]/)) {
    if (button.match(/[0-9]/)) {
      //See number function
      number(input);
    } else {
      //See operator function
      operator(input);
    }
  } else {
    if (num.match(/[0-9]/)) {
      //Add a number
      addNumber(input)
    } else {
      //Add a operator
      addOperator(input);
    };
  };
}

function number(input) {
  //Clear ansArray, push answer to ansArray, show ans in the display
  ans.length = 0;
  ans.push(result.toString());
  smallDisplay.textContent = `Ans = ${ans}`;

  //Clear result ans numbersArray
  result.length = 0;
  numbers.length = 0;

  //Push input in numbersArray and show on screen
  numbers.push(input.dataset.key);
  bigDisplay.textContent = numbers;
}

function operator(input) {
  //Clear ansArray, push answer to ansArray, show ans in the display
  ans.length = 0;
  ans.push(result.toString());
  smallDisplay.textContent = `Ans = ${result}`;

  //Clear numbersArray, push the answer in the numbersArray, push input in numbersArray
  numbers.length = 0;
  numbers.push(result.toString());
  numbers.push(input.dataset.key);

  //Clear resultArray
  result.length = 0;

  //Show input on display
  bigDisplay.textContent = numbers.toString().replace(/,/g, "");
}

//Add number numbersArray. Show the numbersArray on screen
function addNumber(input) {
  numbers.push(input.dataset.key);
  bigDisplay.textContent = numbers.toString().replace(/,/g, "");
}

//Add a operator to numbersArray. Show the numbersArray on screen.
function addOperator(input) {
  //Check for double operators
  if (numbers[numbers.length - 1] == (" + ") || numbers[numbers.length - 1] == (" - ") || numbers[numbers.length - 1] == (" * ") || numbers[numbers.length - 1] == (" / ")) {
    numbers.pop();
    numbers.push(input.dataset.key);
  } else {
    numbers.push(input.dataset.key);
  }
  bigDisplay.textContent = numbers.toString().replace(/,/g, "");
}
