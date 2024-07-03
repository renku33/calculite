/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', initCalculator)

const MAX_DISPLAY_DIGIT_LENGTH = 9

let calculatorStatus
let firstOperand = 0
let currentOperand = '' // we build the operands as strings to avoid the loss of trailing zeros when using a number
let operator = ''

function initCalculator () {
  calculatorStatus = new CalculatorStatus()
  initCalculatorButtons()
  updateDisplay()
}

function addDigitToCurrentOperand (numberValue) {
  resetCurrentOperandAfterOperator()
  currentOperand += numberValue
  updateCalculatorStatus()
}

function setOperator (operatorValue) {
  operator = operatorValue
  firstOperand = Number(currentOperand)
  calculatorStatus.setPendingResetCurrentOperand(true)
  calculatorStatus.setHasResult(false)
  updateCalculatorStatus()
}

function addZeroToCurrentOperand () {
  resetCurrentOperandAfterOperator()
  if (currentOperand.includes('.') || currentOperand !== '') {
    currentOperand += '0'
  }
  console.log('Curent Operand: ', currentOperand)
  updateCalculatorStatus()
}

function addDecimalSeparatorToCurrentOperand () {
  resetCurrentOperandAfterOperator()
  currentOperand = currentOperand.replace('.', '')
  currentOperand += currentOperand === '' ? '0.' : '.'
  updateCalculatorStatus()
}

function resolveOperation (firstOperand, operator, currentOperand) {
  if (operator) {
    const result = calculateResult(firstOperand, Number(currentOperand)) // currentOperand is used as the 2nd operand
    currentOperand = formatResult(result) // we assign result to currentOperand to display the number
    calculatorStatus.setHasResult(true)
    operator = ''
  } else {
    resetCalculator()
  }
  updateCalculatorStatus()
}

function resetCalculator () {
  currentOperand = ''
  operator = ''
  calculatorStatus.reset()
  updateCalculatorStatus()
}

function toggleNegative () {
  if (currentOperand !== '' && currentOperand !== '0') {
    currentOperand = currentOperand.startsWith('-') ? currentOperand.replace('-', '') : '-' + currentOperand
  }
  updateCalculatorStatus()
}

function calculateResult (firstOperand, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return secondOperand === '0' ? 'error' : firstOperand / secondOperand
    default:
      return 'error'
  }
}

function formatResult (result) {
  return String(result).length > MAX_DISPLAY_DIGIT_LENGTH ? result.toExponential(2) : result
}

function resetCurrentOperandAfterOperator () {
  if (calculatorStatus.pendingResetCurrentOperand) {
    calculatorStatus.setPendingResetCurrentOperand(false)
    currentOperand = ''
  }
}

function updateCalculatorStatus () {
  updateDisplay(currentOperand === '' ? '0' : currentOperand)
  const [shouldDisableNumeric, shouldDisableToggle] = handleCalculatorState()
  toggleButtonsState(shouldDisableNumeric, shouldDisableToggle)
}

function updateDisplay (value) {
  document.getElementById('calculatorDisplay').value = String(value).replace('.', ',')
}

function handleCalculatorState () {
  const isOperandMaxLength = currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH
  const hasResult = calculatorStatus.hasResult
  const shouldDisableNumeric = (isOperandMaxLength || hasResult) && !calculatorStatus.pendingResetCurrentOperand
  const shouldDisableToggle = hasResult || (isOperandMaxLength && Number(currentOperand) > 0)
  return [shouldDisableNumeric, shouldDisableToggle]
}

function toggleButtonsState (disableNumeric, disableToggle) {
  toggleButtonGroupState(domNumberButtons, disableNumeric)
  toggleButtonState(domDecimalButton, disableNumeric)
  toggleButtonState(domZeroButton, disableNumeric)
  toggleButtonState(domNegativeButton, disableToggle)
}
