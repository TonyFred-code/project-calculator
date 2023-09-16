const keypad = document.querySelector(".keypad");
const buttons = keypad.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    changeCalcState(button);
  });
});

const calculatorState = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
  result: "",
  expression: "",
};

function updateResult() {}
function updateExpression() {}

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

function changeCalcState(button) {
  const value = button.getAttribute("data-value");

  if (button.classList.contains("digit")) {
    if (!calculatorState.operator) {
      calculatorState.firstOperand += value;
    } else {
      calculatorState.secondOperand += value;
    }
  } else if (button.classList.contains("operator")) {
    if (
      value === "=" &&
      calculatorState.firstOperand &&
      calculatorState.secondOperand
    ) {
      const firstOperand = Number(calculatorState.firstOperand);
      const secondOperand = Number(calculatorState.secondOperand);
      const operator = calculatorState.operator;
      const result = operate(firstOperand, operator, secondOperand);
      console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
    } else if (
      calculatorState.firstOperand &&
      calculatorState.secondOperand &&
      calculatorState.operator
    ) {
      const firstOperand = Number(calculatorState.firstOperand);
      const secondOperand = Number(calculatorState.secondOperand);
      const operator = calculatorState.operator;
      const result = operate(firstOperand, operator, secondOperand);
      console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
    } else {
      calculatorState.operator = value;
    }
    console.log("operator", value);
  } else if (button.classList.contains("fnc")) {
    console.log("function key", value);
  } else {
    return;
  }
  console.table(calculatorState);
}
