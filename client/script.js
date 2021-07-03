
let operation = null
let prevEntry = 0
let currEntry = '0'
let result = 0

$(document).ready(() => {

  updateScreen(result);
  $('.btn').on('click', function() {

    let buttonClick = $(this).html();
    if (buttonClick === "AC") {
      reset()

    } else if (buttonClick === "Del") {
      deleteNum()
      
    } else if (buttonClick === '.') {
      currEntry += '.';

    } else if (isNumber(buttonClick)) {
      if (currEntry === '0' ) currEntry = buttonClick;
      else currEntry += buttonClick;

    } else if (isOperator(buttonClick)) {
      prevEntry = parseFloat(currEntry);
      operation = buttonClick;
      currEntry = '';

    } else if (buttonClick === '=') {
      
      if (!prevEntry) {
        reset()
      }
      currEntry = operationCalc(prevEntry, currEntry, operation);
      operation = null;
    }  
    updateScreen(currEntry);
  })
})

function updateScreen (params)  {
  try { 
    let displayValue = params.toString();
    $('.screen-result').html(displayValue.slice(0));
    previousScreen()
  } catch (error) {
    if (error instanceof SyntaxError) {
      errorHandling(error)
    }
    if (error instanceof TypeError) {
      errorHandling(error)
    }
  }
}

function reset() {
  operation = null
  prevEntry = 0
  currEntry = '0'
  result = 0
}

function deleteNum() {
  currEntry = currEntry.slice(0, currEntry.length-1);
}

function errorHandling (error) {
  if (error instanceof SyntaxError) {
    alert("Error! Resetting values.");
    
  }
  if (error instanceof TypeError) {
    
    alert("Error! Resetting values.");
    updateScreen(result)
  }
}

function isOperator(operator) {
  return operator === '/' || operator === '*' || operator === '+' || operator === '-'
}

function isNumber(num) {
  return !isNaN(num)
}

function operationCalc(a,b,operation) {
  a = parseFloat(a)
  b = parseFloat(b)
  switch (operation) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '/':
      return a / b
    case '*':
      return a * b
    default:
      break;
  }
}