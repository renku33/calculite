/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function initCalculatorButtons (status) {
  gatherDomButtons(status)
}

// Gather Dom Buttons
function gatherDomButtons (status) {
  let domNumberButtons = document.querySelectorAll('.numbers button')
  let domOperatorsButtons = document.querySelectorAll('.operators button')
  let domEqualButton = document.getElementById('equal')
  let domResetButton = document.getElementById('reset')
  let domNegativeButton = document.getElementById('toggleNegative')
  let domZeroButton = document.getElementById('0')
  let domDecimalButton = document.getElementById('decimal')
  addEventListeners(domNumberButtons, domOperatorsButtons, domEqualButton, domResetButton, domNegativeButton, domZeroButton, domDecimalButton, status)
}

// Add Event Listeners
function addEventListeners (domNumberButtons, domOperatorsButtons, domEqualButton, domResetButton, domNegativeButton, domZeroButton, domDecimalButton, status) {
  domNumberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => updateDigitValue(numberButton.value, status))
  })

  domOperatorsButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => updateOperatorValue(operatorButton.value, status))
  })

  domZeroButton.addEventListener('click', () => addZeroToCurrentNumber(status))

  domDecimalButton.addEventListener('click', () => addDecimalToCurrentNumber(status))

  domEqualButton.addEventListener('click', () => resolveOperation(status))

  domResetButton.addEventListener('click', () => resetCalculator(status))

  domNegativeButton.addEventListener('click', () => toggleNegative(status))
}

// Disable Functions
function disableNumericButtons () {
  disableNumberButtons()
  disableCommaButton()
  disableZeroButton()
}

function disableNumberButtons () {
  domNumberButtons.forEach(button => {
    button.setAttribute('disabled', '')
    button.classList.add('disabled-number-buttons')
  })
}

function disableCommaButton () {
  domDecimalButton.setAttribute('disabled', '')
  domDecimalButton.classList.add('disabled-number-buttons')
}

function disableZeroButton () {
  domZeroButton.setAttribute('disabled', '')
  domZeroButton.classList.add('disabled-number-buttons')
}

function disableToggleNegativeButton () {
  domNegativeButton.setAttribute('disabled', '')
  domNegativeButton.classList.add('disabled-other-buttons')
}

// Enable Functions
function enableNumericButtons () {
  enableNumberButtons()
  enableCommaButton()
  enableZeroButton()
}

function enableNumberButtons () {
  domNumberButtons.forEach(button => {
    button.removeAttribute('disabled')
    button.classList.remove('disabled-number-buttons')
  })
}

function enableCommaButton () {
  domDecimalButton.removeAttribute('disabled')
  domDecimalButton.classList.remove('disabled-number-buttons')
}

function enableZeroButton () {
  domZeroButton.removeAttribute('disabled')
  domZeroButton.classList.remove('disabled-number-buttons')
}

function enableToggleNegativeButton () {
  domNegativeButton.removeAttribute('disabled')
  domNegativeButton.classList.remove('disabled-other-buttons')
}
