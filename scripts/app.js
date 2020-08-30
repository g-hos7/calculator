const display = document.querySelector('#display');
const number = document.createElement('div');
display.appendChild(number).id = 'text';

function numberSelect(display) {
  document.querySelectorAll('.num').forEach((btn) => {
    btn.addEventListener('click', () => {
      display.innerText += btn.innerText;
    });
  });
}

function backspace(display) {
  document.querySelector('#backspace').addEventListener('click', () => {
    display.innerText = display.innerText.replace(/.$/, '');
  });
}

function clearSelect(display) {
  document.querySelector('#clear').addEventListener('click', () => {
    display.innerText = '';
    operator = '';
    num1 = NaN;
  });
}

function signSelect(display) {
  document.querySelector('#sign').addEventListener('click', () => {
    if(display.innerText.includes('-')) {
      display.innerText = display.innerText.replace('-', '');
    } else {
      display.innerText = '-' + display.innerText;
    }
  });
}

function operatorSelect(display) {
  document.querySelectorAll('.sideBtns').forEach((btn) => {
    btn.addEventListener('click', () => {
      operator = btn.id;
      num1 = parseFloat(display.innerText);
      display.innerText = '';
    });
  });
}

function equalSelect(display) {
  document.querySelector('#equals').addEventListener('click', () => {
    display.innerText = operate(operator, num1, parseFloat(display.innerText));
  });
}

function operate(operator, num1, num2) {
  let result = 0;
  switch(operator) {
    case "add":
      result = add(num1, num2);
      break;
    case "subtract":
      result = subtract(num1, num2);
      break;
    case "multiply":
      result = multiply(num1, num2);
      break;
    case "divide":
      result = divide(num1, num2);
      break;
    default:
      console.log(operator);
      result = "ERROR"
  }
  if(typeof result === "string") {
    return result;
  } else {
    return result.toFixed(2);
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if(num2 === 0) {
    return "DIVISION ERROR";
  } else {
    return num1 / num2;
  }
}

function calculate() {
  let num1 = NaN;
  let operator = '';
  signSelect(number);
  numberSelect(number);
  backspace(number);
  clearSelect(number);
  operatorSelect(number);
  equalSelect(number);
}

calculate();