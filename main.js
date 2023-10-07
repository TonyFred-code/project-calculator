const keypad = document.querySelector(".keypad");
const buttons = keypad.querySelectorAll("button");
const expressionTab = document.querySelector("#expression");
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


  displayScreen.value = calculatorState.displayedValue;
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
    console.log("line 80")
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
  let { displayedValue, waitingForSecondOperand } = calculatorState;

  if (waitingForSecondOperand) {
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
    console.log("that")
    return;
  }

  if (firstOperand !== null && operator && secondOperand !== null) {
    let result = operate(firstOperand, operator, secondOperand);
    resetCalculator();
    calculatorState.firstOperand = result;
    calculatorState.displayedValue = String(result);
    calculatorState.operator = nextOperator;
    console.log("i am doing it")
    return;
  }

  if (firstOperand !== null && !waitingForSecondOperand) {
    calculatorState.operator = nextOperator;
    calculatorState.waitingForSecondOperand = true;
    console.log("this")
  }
}

function handleEqual() {
  let { firstOperand, operator, secondOperand, displayedValue } =
    calculatorState;

  if (firstOperand !== null && operator && secondOperand !== null) {
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

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstOperand, operator, secondOperand) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(firstOperand, secondOperand);
      break;
    case "*":
      result = multiply(firstOperand, secondOperand);
      break;

    case "-":
      result = subtract(firstOperand, secondOperand);
      break;
    case "/":
      if (secondOperand === 0) {
       alert("division by zero is not tolerated");
        return;
      }
      result = divide(firstOperand, secondOperand);
      break;
    default:
      result = secondOperand;
      console.table(firstOperand, operator, secondOperand);
      break;
  }

  return Number(result.toFixed(12));
}

updateResult();
