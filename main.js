const keypad = document.querySelector(".keypad");
const buttons = keypad.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    console.log(button, value);
  });
});

const calculatorState = {
  firstOperand: null,
  secondOperand: null,
  operate: null,
  result: null,
  expression: null,
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

  console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
}
