/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

// Constants
const MAX_DISPLAY_DIGIT_LENGTH = 9

// Status
function initCalculatorStatus () {
  let status = initializeStatus()
  initCalculatorButtons(status)
}

// Declare Global Variables
let firstOperand = 0
let currentOperand = ''
let operator = ''

// Update Value functions
function updateDigitValue (numberValue, status) {
  resetCurrentOperandAfterSelectedOperator(status)
  currentOperand += numberValue // This function uses String data type for the operand to avoid certain problems
  checkStatusAndUpdateCalculator(status)
}

function updateOperatorValue (operatorValue, status) {
  operator = operatorValue
  firstOperand = Number(currentOperand)
  status.checkStatusAndUpdateCalculator = true
  status.hasResult = false
  checkStatusAndUpdateCalculator(status)
}

function addZeroToCurrentNumber (status) {
  if (currentOperand.includes('.') || currentOperand != '') {
    resetCurrentOperandAfterSelectedOperator(status)
    currentOperand += '0'
  }
  checkStatusAndUpdateCalculator(status)
}

function addDecimalToCurrentNumber (status) {
  resetCurrentOperandAfterSelectedOperator(status)
  currentOperand = currentOperand.replace('.', '')
  if (currentOperand == '') {
    currentOperand += '0'
  }
  currentOperand += '.'
  checkStatusAndUpdateCalculator(status)
}

function resolveOperation (status) {
  if (operator) {
    let result = calculateResult()
    result = formatResult(result)
    currentOperand = result
    status.hasResult = true
    operator = ''
  } else {
    resetCalculator()
  }
  checkStatusAndUpdateCalculator(status)
}

function resetCalculator (status) {
  currentOperand = ''
  operator = ''
  status.hasResult = false
  checkStatusAndUpdateCalculator(status)
}

function toggleNegative (status) {
  if (Number(currentOperand) != 0) {
    if (currentOperand.startsWith('-')) {
      currentOperand = currentOperand.replace('-', '')
    } else {
      currentOperand = '-' + currentOperand
    }
  }
  checkStatusAndUpdateCalculator(status)
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

function resetCurrentOperandAfterSelectedOperator (status) {
  if (status.pendingResetCurrentOperand) {
    status.pendingResetCurrentOperand = false
    currentOperand = ''
  }
}

// --------------------------------------------------------------- MAIN --------------------------------------------------------------

// Update Status
function checkStatusAndUpdateCalculator (status) {
  let valueToDisplay = currentOperand

  if (valueToDisplay == '') {
    valueToDisplay = 0
  }

  // Update Display
  updateDisplay(valueToDisplay)

  // Disable Buttons if needed
  if (currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH || status.hasResult) {
    disableNumericButtons()
    if (Number(currentOperand) > 0 || status.hasResult) {
      disableToggleNegativeButton()
    }
  } else { // Enable Buttons
    enableNumericButtons()
    enableToggleNegativeButton()
  }

  // Enable buttons if operator exists and the display hasn't been reset yet
  if (operator && status.pendingResetCurrentOperand) {
    enableNumericButtons()
    disableToggleNegativeButton()
  }
}

// Update Display
function updateDisplay (valueToDisplay) {
  document.getElementById('calculatorDisplay').value = String(valueToDisplay).replace('.', ',')
}

// Initialize Status
function initializeStatus () {
  return {
    pendingResetCurrentOperand: false,
    hasResult: false
  }
}
