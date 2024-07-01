/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

// Constants
const MAX_DISPLAY_DIGIT_LENGTH = 9

let statusAAA

// Status
function initCalculatorStatus () {
  statusAAA  = new calculatorStatus()
  console.log(statusAAA)
  initCalculatorButtons(statusAAA)
}

// Declare Global Variables   
let firstOperand = 0
let currentOperand = ''
let operator = ''

// Update Value functions
function updateDigitValue (numberValue, statusAAA) {
  resetCurrentOperandAfterSelectedOperator(statusAAA)
  currentOperand += numberValue // This function uses String data type for the operand to avoid certain problems
  checkStatusAndUpdateCalculator(statusAAA)
}

function updateOperatorValue (operatorValue, statusAAA) {
  operator = operatorValue
  firstOperand = Number(currentOperand)
  statusAAA.checkStatusAndUpdateCalculator(true)
  statusAAA.hasResult(false)
  checkStatusAndUpdateCalculator(statusAAA)
}

function addZeroToCurrentNumber (statusAAA) {
  if (currentOperand.includes('.') || currentOperand != '') {
    resetCurrentOperandAfterSelectedOperator(statusAAA)
    currentOperand += '0'
  }
  checkStatusAndUpdateCalculator(statusAAA)
}

function addDecimalToCurrentNumber (statusAAA) {
  resetCurrentOperandAfterSelectedOperator(statusAAA)
  currentOperand = currentOperand.replace('.', '')
  if (currentOperand == '') {
    currentOperand += '0'
  }
  currentOperand += '.'
  checkStatusAndUpdateCalculator(statusAAA)
}

function resolveOperation (statusAAA) {
  if (operator) {
    let result = calculateResult()
    result = formatResult(result)
    currentOperand = result
    statusAAA.hasResult(true)
    operator = ''
  } else {
    resetCalculator()
  }
  checkStatusAndUpdateCalculator(statusAAA)
}

function resetCalculator (statusAAA) {
  currentOperand = ''
  operator = ''
  statusAAA.hasResult(false)
  checkStatusAndUpdateCalculator(statusAAA)
}

function toggleNegative (statusAAA) {
  if (Number(currentOperand) != 0) {
    if (currentOperand.startsWith('-')) {
      currentOperand = currentOperand.replace('-', '')
    } else {
      currentOperand = '-' + currentOperand
    }
  }
  checkStatusAndUpdateCalculator(statusAAA)
}

function calculateResult () {
  let result

  switch (operator) {
    case '+':
      result = firstOperand + Number(currentOperand)
      break
    case '-':
      result = firstOperand - Number(currentOperand)
      break
    case '/':
      if (Number(currentOperand) == 0) {
        result = 'error'
      } else {
        result = firstOperand / Number(currentOperand)
      }
      break
    case '*':
      result = firstOperand * Number(currentOperand)
      break
  }
  return result
}

function formatResult (result) {
  // eslint-disable-next-line prefer-const
  let resultString = String(result)

  if (resultString.length > MAX_DISPLAY_DIGIT_LENGTH) {
    result = result.toExponential(2)
  }
  return result
}

function resetCurrentOperandAfterSelectedOperator (statusAAA) {
  if (statusAAA.pendingResetCurrentOperand) {
    statusAAA.pendingResetCurrentOperand(false)
    currentOperand = ''
  }
}

// --------------------------------------------------------------- MAIN --------------------------------------------------------------

// Update Status
function checkStatusAndUpdateCalculator (statusAAA) {
  let valueToDisplay = currentOperand

  if (valueToDisplay == '') {
    valueToDisplay = 0
  }

  // Update Display
  updateDisplay(valueToDisplay)

  // Disable Buttons if needed
  if (currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH || statusAAA.hasResult) {
    disableNumericButtons()
    if (Number(currentOperand) > 0 || statusAAA.hasResult) {
      disableToggleNegativeButton()
    }
  } else { // Enable Buttons
    enableNumericButtons()
    enableToggleNegativeButton()
  }

  // Enable buttons if operator exists and the display hasn't been reset yet
  if (operator && statusAAA.pendingResetCurrentOperand) {
    enableNumericButtons()
    disableToggleNegativeButton()
  }
  console.log(statusAAA)
}

// Update Display
function updateDisplay (valueToDisplay) {
  document.getElementById('calculatorDisplay').value = String(valueToDisplay).replace('.', ',')
}

// // Initialize Status
// function initializeStatus () {
//   return {
//     pendingResetCurrentOperand: false,
//     hasResult: false
//   }
// }
