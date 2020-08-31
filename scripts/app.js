const display = document.querySelector('#display');
const number = document.createElement('div');
number.innerText = '0';
display.appendChild(number).id = 'text';

function displayTrim(display) {
  let currDisplay = display.innerText;
  if(currDisplay.length > 12) {
    display.innerText = currDisplay.substring(0, 12);
  }
}

function numberSelect(display) {
  document.querySelectorAll('.num').forEach((btn) => {
    btn.addEventListener('click', () => {
      if(display.innerText === '0') {
        display.innerText = btn.innerText;
      } else {
        display.innerText += btn.innerText;
      }
      displayTrim(display);
    });
  });
}

function periodSelect(display, num1) {
  document.querySelector('#period').addEventListener('click', () => {
    if(!num1 === NaN) {
      display.innerText = '0'
      display.innerText += '.';
    } else if(!display.innerText.includes('.')) {
      display.innerText += '.';
    }
  });
}

function backspaceSelect(display) {
  document.querySelector('#backspace').addEventListener('click', () => {
    display.innerText = display.innerText.replace(/.$/, '');
  });
}

function clearSelect(display) {
  document.querySelector('#clear').addEventListener('click', () => {
    display.innerText = '0';
    operator = '';
    num1 = NaN;
  });
}

function percentSelect(display) {
  document.querySelector('#percent').addEventListener('click', () => {
    let num = parseFloat(display.innerText);
    display.innerText = num / 100;
  });
}

function signSelect(display) {
  document.querySelector('#sign').addEventListener('click', () => {
    display.innerText = parseFloat(display.innerText) * -1;
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

function equalSelect(display, num1) {
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
  periodSelect(number, num1);
  backspaceSelect(number);
  percentSelect(number);
  clearSelect(number);
  operatorSelect(number);
  equalSelect(number, num1);
}

calculate();