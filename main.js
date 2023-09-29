const keypad = document.querySelector(".keypad");
const buttons = keypad.querySelectorAll("button");
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
      case "=":
        handleOperator(value);
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
  });
});

const calculatorState = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  result: "",
  expression: "",
  displayValue: "0",
};

function updateResult() {
  const displayScreen = document.querySelector("#result");

  displayScreen.value = calculatorState.displayValue;
}

function updateExpression() {

}

function inputDigit(digit) {
  const {
    displayValue,
    waitingForSecondOperand,
    secondOperand,
    operator,
    firstOperand,
  } = calculatorState;

  if (waitingForSecondOperand) {
    calculatorState.displayValue = digit;
    calculatorState.waitingForSecondOperand = false;
  } else {
    calculatorState.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  if (operator && firstOperand) {
    calculatorState.secondOperand = Number(calculatorState.displayValue);
  } else {
    calculatorState.firstOperand = Number(calculatorState.displayValue);
  }

  console.table(calculatorState);
}

function inputDecimal(dot) {
  if (calculatorState.waitingForSecondOperand) {
    calculatorState.displayValue = "0.";
    calculatorState.waitingForSecondOperand = false;
    return;
  }

  if (!calculatorState.displayValue.includes(dot)) {
    calculatorState.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator, waitingForSecondOperand } =
    calculatorState;
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    calculatorState.operator = nextOperator;
    console.table(calculatorState);
    return;
  }

  if (firstOperand === null && !Number.isNaN(inputValue)) {
    calculatorState.firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, operator, inputValue);

    calculatorState.displayValue = `${parseFloat(result.toFixed(8))}`;
    calculatorState.firstOperand = result;
  }

  calculatorState.waitingForSecondOperand = true;
  calculatorState.operator = nextOperator;
  console.table(calculatorState);
}

function resetCalculator() {
  calculatorState.displayValue = "0";
  calculatorState.firstOperand = null;
  calculatorState.waitingForSecondOperand = false;
  calculatorState.operator = null;
  console.table(calculatorState);
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
        console.error("SUCH ISN'T HAPPENING HERE!");
        return;
      }
      result = divide(firstOperand, secondOperand);
      break;
    default:
      console.table(firstOperand, operator, secondOperand);
      break;
  }

  return result;
}

updateResult();
