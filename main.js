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
      case "backspace":
        handleBackspace();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputDigit(value);
        }
    }

    if (value === "=") {
      // updateResult();
      console.log("do something")
    } else {
      updateExpression();
    }
    console.table(calculatorState);
  });
});

const calculatorState = {
  firstOperand: null,
  secondOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  result: "",
  expression: "0",
  displayValue: "0",
  clickedDigit: "0",
};

function updateResult() {
  const displayScreen = document.querySelector("#result");

  displayScreen.value = calculatorState.result;
}

function updateExpression() {
  let { firstOperand, secondOperand, expression, operator, clickedDigit } =
    calculatorState;

  if (clickedDigit === "-") {
    calculatorState.expression = clickedDigit;
  } else if (firstOperand && operator) {
    calculatorState.expression = `${firstOperand} ${operator}`;
  } else {
    calculatorState.expression = clickedDigit;
  }

  const expressionScreen = document.querySelector("#expression");
  expressionScreen.value = calculatorState.expression;
}

function inputDigit(digit) {
  const {
    expression,
    waitingForSecondOperand,
    secondOperand,
    operator,
    firstOperand,
    clickedDigit,
  } = calculatorState;

  if (clickedDigit.length >= 13) {
    alert("This is a mini project, reduce my stress please... limit reached");
    return;
  }

  if (clickedDigit === "0" || clickedDigit === "") {
    calculatorState.clickedDigit = digit;
  } else if (clickedDigit === "-") {
    calculatorState.clickedDigit = `-${digit}`;
  } else {
    calculatorState.clickedDigit = `${clickedDigit}${digit}`;
  }

  if (operator && firstOperand && waitingForSecondOperand) {
    calculatorState.secondOperand = Number(calculatorState.clickedDigit);
  } else {
    calculatorState.firstOperand = Number(calculatorState.clickedDigit);
  }
}

function inputDecimal(dot) {
  if (calculatorState.waitingForSecondOperand) {
    calculatorState.displayValue = "0.";
    calculatorState.waitingForSecondOperand = false;
    return;
  }

  if (
    !calculatorState.expression.includes(dot) &&
    !calculatorState.clickedDigit.includes(dot)
  ) {
    calculatorState.expression += dot;
    calculatorState.clickedDigit += dot;
  }
}

function handleOperator(nextOperator) {
  const {
    firstOperand,
    secondOperand,
    displayValue,
    operator,
    waitingForSecondOperand,
    clickedDigit,
  } = calculatorState;
  // const inputValue = parseFloat(displayValue);
  // calculatorState.clickedDigit = "0";

  // if (operator && waitingForSecondOperand) {
  //   calculatorState.operator = nextOperator;
  //   calculatorState.expression = `${firstOperand} ${nextOperator} `
  //   console.table(calculatorState);
  //   return;
  // }

  // if (!waitingForSecondOperand) {
  //   calculatorState.expression = `${firstOperand} ${nextOperator} `
  //   console.log("something")
  // } else if (secondOperand) {
  //   calculatorState.expression += `${secondOperand}`;
  // }

  // if (firstOperand === null) {
  //   calculatorState.firstOperand = inputValue;
  // } else if (operator) {
  //   const result = operate(firstOperand, operator, secondOperand);

  //   calculatorState.displayValue = `${parseFloat(result.toFixed(8))}`;
  //   calculatorState.firstOperand = result;
  // }

  // calculatorState.waitingForSecondOperand = true;
  // calculatorState.operator = nextOperator;
  // console.table(calculatorState);

  if (firstOperand === null && nextOperator === "-") {
    calculatorState.clickedDigit = "-";
    calculatorState.expression = "-";
    return;
  }

  if (clickedDigit === "-" && operator === null && nextOperator !== "-") {
    calculatorState.clickedDigit = "0";
    calculatorState.expression = "0";
    return;
  }

  if (!firstOperand) {
    return;
  }

  if (operator && waitingForSecondOperand) {
    calculatorState.operator = nextOperator;
    return;
  }

  if (firstOperand && operator === null) {
    calculatorState.operator = nextOperator;
    calculatorState.waitingForSecondOperand = true;
    calculatorState.clickedDigit = "";
  }
}

function handleEqual() {
  let {firstOperand, secondOperand, expression, clickedDigit, result, operator, waitingForSecondOperand} = calculatorState;

  if (firstOperand === null) {
    return;
  }

  if (firstOperand && !operator) {
    return;
  } else if (waitingForSecondOperand) {
    return;
  }
}

function handleBackspace() {
  let { firstOperand, clickedDigit, expression, secondOperand, operator} = calculatorState;
  if (firstOperand === null || clickedDigit === "0") {
    console.log("nothing done")
    return;
  }

  if (firstOperand && operator && !secondOperand) {
    calculatorState.operator = null;
    calculatorState.expression = `${clickedDigit}`;
  } else if (firstOperand && !operator) {
    calculatorState.clickedDigit = clickedDigit.slice(0, -1);
    if (calculatorState.clickedDigit === "") {
      calculatorState.clickedDigit = "0";
    }
  }

}

function resetCalculator() {
  calculatorState.displayValue = "0";
  calculatorState.firstOperand = null;
  calculatorState.waitingForSecondOperand = false;
  calculatorState.operator = null;
  calculatorState.expression = "0";
  calculatorState.clickedDigit = "0";
  calculatorState.secondOperand = null;
  calculatorState.result = ""
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
      result = secondOperand;
      console.table(firstOperand, operator, secondOperand);
      break;
  }

  return result;
}

// updateResult();
updateExpression();
