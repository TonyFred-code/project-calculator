const keypad = document.querySelector(".keypad");
const buttons = keypad.querySelectorAll("button");
const expressionTab = document.querySelector("#expression");
const digitOne = document.querySelector("[data-value='1']");
const digitTwo = document.querySelector("[data-value='2']");
const digitThree = document.querySelector("[data-value='3']");
const digitFour = document.querySelector("[data-value='4']");
const digitFive = document.querySelector("[data-value='5']");
const digitSix = document.querySelector("[data-value='6']");
const digitSeven = document.querySelector("[data-value='7']");
const digitEight = document.querySelector("[data-value='8']");
const digitNine = document.querySelector("[data-value='9']");
const digitZero = document.querySelector("[data-value='0']");
const plusDigit = document.querySelector("[data-value='+']");
const multiplyDigit = document.querySelector("[data-value='*']");
const divideDigit = document.querySelector("[data-value='/']");
const minusDigit = document.querySelector("[data-value='-']");
const enterDigit = document.querySelector("[data-value='=']");
const backspaceDigit = document.querySelector("[data-value='backspace']");
const decimalPointDigit = document.querySelector("[data-value='.']");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const { target } = event;
    const value = target.getAttribute("data-value");

    if (!target.matches("button")) {
      return;
    }

    switch (value) {
      case "+":
      case "-":
      case "/":
      case "*":
        handleOperator(value);
        break;
      case "=":
        handleEqual();
        break;
      case ".":
        inputDecimal(value);
        break;
      case "all-clear":
        resetCalculator();
        break;
      case "backspace":
        handleBackspace();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }

    updateResult();
    console.table(calculatorState);
  });
});

const calculatorState = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  displayedValue: "0",
};

function updateResult() {
  const displayScreen = document.querySelector("#result");
  const { displayedValue } = calculatorState;

    displayScreen.value = displayedValue;
}

function inputDigit(digit) {
  const {
    waitingForSecondOperand,
    secondOperand,
    operator,
    firstOperand,
    displayedValue,
  } = calculatorState;

  if (displayedValue.length >= 13) {
    alert("This is a mini project, reduce my stress please... limit reached");
    return;
  }

  if (displayedValue === "0") {
    console.log("line 75");
    calculatorState.displayedValue = digit;
  } else if (displayedValue === "-") {
    calculatorState.displayedValue = `-${digit}`;
  } else if (Number(displayedValue) === firstOperand && operator !== null) {
    console.log("line 80");
    calculatorState.displayedValue = digit;
  } else {
    calculatorState.displayedValue = `${displayedValue}${digit}`;
  }

  if (operator && firstOperand !== null) {
    calculatorState.secondOperand = Number(calculatorState.displayedValue);
  } else {
    calculatorState.firstOperand = Number(calculatorState.displayedValue);
  }
}

function inputDecimal(dot) {
  let { displayedValue, waitingForSecondOperand, secondOperand } =
    calculatorState;

  if (waitingForSecondOperand && secondOperand === null) {
    calculatorState.waitingForSecondOperand = false;
    calculatorState.displayedValue = "0.";
    return;
  }

  if (!displayedValue.includes(dot)) {
    calculatorState.displayedValue += ".";
  }
}

function handleOperator(nextOperator) {
  let {
    firstOperand,
    displayedValue,
    secondOperand,
    operator,
    waitingForSecondOperand,
  } = calculatorState;

  if (displayedValue === "-" && nextOperator !== "-") {
    calculatorState.displayedValue = "0";
    return;
  }

  if (nextOperator === "-" && firstOperand === null) {
    calculatorState.displayedValue = "-";
    return;
  }

  if (firstOperand === null) {
    console.log("i am working");
    return;
  }

  if (firstOperand !== null && operator && secondOperand === null) {
    calculatorState.operator = nextOperator;
    calculatorState.waitingForSecondOperand = true;
    console.log("that");
    return;
  }

  if (firstOperand !== null && operator && secondOperand !== null) {
    let result = operate(firstOperand, operator, secondOperand);
    resetCalculator();
    calculatorState.firstOperand = result;
    calculatorState.displayedValue = String(result);
    calculatorState.operator = nextOperator;
    console.log("i am doing it");
    return;
  }

  if (firstOperand !== null && !waitingForSecondOperand) {
    calculatorState.operator = nextOperator;
    calculatorState.waitingForSecondOperand = true;
    console.log("this");
  }
}

function handleEqual() {
  let { firstOperand, operator, secondOperand, displayedValue } =
    calculatorState;

  if (firstOperand !== null && operator && secondOperand !== null) {
    if (operator === "/" && secondOperand === 0) {
      resetCalculator();
      alert("division by zero is not tolerated");
      return;
    }
    let result = operate(firstOperand, operator, secondOperand);
    resetCalculator();
    calculatorState.displayedValue = String(result);
    calculatorState.firstOperand = result;
  } else {
    console.log("i am working");
    return;
  }
}

function resetCalculator() {
  calculatorState.displayedValue = "0";
  calculatorState.firstOperand = null;
  calculatorState.secondOperand = null;
  calculatorState.operator = null;
  calculatorState.waitingForSecondOperand = false;
}

function handleBackspace() {
  const { displayedValue, secondOperand, firstOperand, operator } =
    calculatorState;

  calculatorState.displayedValue = `${displayedValue.slice(0, -1)}`;
  if (calculatorState.displayedValue === "") {
    calculatorState.displayedValue = "0";
  }

  if (secondOperand === null) {
    calculatorState.firstOperand = Number(calculatorState.displayedValue);
  } else if (operator && firstOperand !== null) {
    calculatorState.secondOperand = Number(calculatorState.displayedValue);
  }
}

window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    switch (event.key) {
      case "1":
        digitOne.click();
        break;
      case "2":
        digitTwo.click();
        break;
      case "3":
        digitThree.click();
        break;
      case "4":
        digitFour.click();
        break;
      case "5":
        digitFive.click();
        break;
      case "6":
        digitSix.click();
        break;
      case "7":
        digitSeven.click();
        break;
      case "8":
        digitEight.click();
        break;
      case "9":
        digitNine.click();
        break;
      case "0":
        digitZero.click();
        break;
      case "+":
        plusDigit.click();
        break;
      case "*":
        multiplyDigit.click();
        break;
      case "/":
        divideDigit.click();
        break;
      case "-":
        minusDigit.click();
        break;
      case "Backspace":
        backspaceDigit.click();
        break;
      case "Enter":
        enterDigit.click();
        break;
      case ".":
        decimalPointDigit.click();
        break;

      default:
        console.log(event.key);
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);

function operate(firstOperand, operator, secondOperand) {
  let result = 0;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;

    case "-":
      result = firstOperand - secondOperand;
      break;
    case "/":
      if (secondOperand === 0) {
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      result = secondOperand;
      console.table(firstOperand, operator, secondOperand);
      break;
  }

  return Number(result.toFixed(12));
}

updateResult();
