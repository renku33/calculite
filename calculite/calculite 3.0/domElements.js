/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let domNumberButtons
let domOperatorsButtons
let domEqualButton
let domResetButton
let domNegativeButton
let domZeroButton
let domDecimalButton

function initCalculatorButtons () {
  gatherDomButtons()
  addEventListeners()
}

function gatherDomButtons () {
  domNumberButtons = document.querySelectorAll('.numbers button')
  domOperatorsButtons = document.querySelectorAll('.operators button')
  domEqualButton = document.getElementById('equal')
  domResetButton = document.getElementById('reset')
  domNegativeButton = document.getElementById('toggleNegative')
  domZeroButton = document.querySelector('button[value="0"]')
  domDecimalButton = document.querySelector('button[value="."]')
}

// The click events should generate a state instead of executing functions
function addEventListeners () {
  domNumberButtons.forEach(button => button.addEventListener('click', () => addDigitToCurrentOperand(button.value)))
  domOperatorsButtons.forEach(button => button.addEventListener('click', () => setOperator(button.value)))
  domZeroButton.addEventListener('click', addZeroToCurrentOperand)
  domDecimalButton.addEventListener('click', addDecimalSeparatorToCurrentOperand)
  domEqualButton.addEventListener('click', resolveOperation)
  domResetButton.addEventListener('click', resetCalculator)
  domNegativeButton.addEventListener('click', toggleNegative)
}

function toggleButtonState (button, shouldDisable) {
  button.disabled = shouldDisable
  button.classList.toggle('disabled-number-buttons', shouldDisable)
}

function toggleButtonGroupState (buttons, shouldDisable) {
  buttons.forEach(button => toggleButtonState(button, shouldDisable))
}
