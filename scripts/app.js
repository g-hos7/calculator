let display = '0';
let num1 = null;
let num2 = null;
let op1 = null;
let op2 = null;
let result = null;
const calcButtons = document.querySelectorAll('button');

refreshDisplay();
handleButtons();

function roundNum(num, decimals) {
  return parseFloat(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}

function refreshDisplay() {
  const displayText = document.querySelector('#text');
  displayText.innerText = display;
  if(display.length > 12) {
    displayText.innerText = display.substring(0, 12);
  }
}

function handleButtons() {
  calcButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if(btn.classList.contains('num')) {
        numberSelect(btn.value);
        refreshDisplay();
      } else if(btn.classList.contains('sideBtns')) {
        operatorSelect(btn.id);
      } else if(btn.id === 'equals') {
        equalSelect();
        refreshDisplay();
      } else if(btn.id === 'clear') {
        clearSelect();
        refreshDisplay();
      } else if(btn.id === 'backspace') {
        backspaceSelect();
        refreshDisplay();
      } else if(btn.id === 'period') {
        periodSelect()
        refreshDisplay();
      } else if(btn.id === 'sign') {
        signSelect(display);
        refreshDisplay();
      } else if(btn.id === 'percent') {
        percentSelect(display);
        refreshDisplay(); 
      }
    });
  });
}

function numberSelect(number) {
  if(op1 === null) {
    if(display === '0' || display === 0) {
      display = number;
    } else if(display === num1) {
      display = number;
    } else {
      display += number;
    }
  } else {
    if(display === num1) {
      display = number;
    } else {
      display += number;
    }
  }
}

function periodSelect() {
  if(display === num1 || display === num2) {
    display = '0';
    display += '.'
  } else if(!display.includes('.')) {
    display += '.';
  }
}

function backspaceSelect() {
  display = display.replace(/.$/, '');
}

function clearSelect() {
  display = '0';
  num1 = null;
  num2 = null;
  op1 = null;
  op2 = null;
  result = null;
}

function percentSelect(number) {
  display = (number / 100).toString();
}

function signSelect(number) {
 display = (number * -1).toString();
}

function operatorSelect(operator) {
  if(op1 !== null && op2 === null) {
    op2 = operator;
    num2 = display;
    result = operate(op1 ,Number(num1), Number(num2));
    display = roundNum(result, 15).toString();
    num1 = display;
    result = null;
  } else if(op1 !== null && op2 !== null) {
    op2 = display;
    result = operate(op2, Number(num1), Number(num2));
    op2 = operator;
    display = roudnNum(result, 15).toString();
    num1 = display;
    result = null;
  } else {
    op1 = operator;
    num1 = display;
  }
}

function equalSelect() {
  if(op1 === null) {
    display = display;
  } else if(op2 !== null) {
    num2 = display;
    result = operate(op2, Number(num1), Number(num2));
    if(result === 'DIVISION ERR') {
      display = 'DIVISION ERR';
    } else {
      display = roundNum(result, 15).toString();
      num1 = display;
      num2 =  null;
      op1 = null;
      op2 = null;
      result = null;
    }
  } else {
    num2 = display;
    result = operate(op1, Number(num1), Number(num2));
    if(result === 'DIVISION ERR') {
      display = 'DIVISION ERR';
    } else {
      display = roundNum(result, 15).toString();
      num1 = display;
      num2 =  null;
      op1 = null;
      op2 = null;
      result = null;
    }
  }
}

function operate(operator, num1, num2) {
  let result = '0';
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
  return result;
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
    return "DIVISION ERR";
  } else {
    return num1 / num2;
  }
}