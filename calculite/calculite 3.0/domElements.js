/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars

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

// Gather Dom Buttons
function gatherDomButtons () {
  domNumberButtons = document.querySelectorAll('.numbers button')
  domOperatorsButtons = document.querySelectorAll('.operators button')
  domEqualButton = document.getElementById('equal')
  domResetButton = document.getElementById('reset')
  domNegativeButton = document.getElementById('toggleNegative')
  domZeroButton = document.getElementById('0')
  domDecimalButton = document.getElementById('decimal')
  addEventListeners(domNumberButtons, domOperatorsButtons, domEqualButton, domResetButton, domNegativeButton, domZeroButton, domDecimalButton, status)
}

// Add Event Listeners
function addEventListeners () {
  domNumberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => updateDigitValue(numberButton.value))
  })

  domOperatorsButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => updateOperatorValue(operatorButton.value))
  })

  domZeroButton.addEventListener('click', () => addZeroToCurrentNumber())

  domDecimalButton.addEventListener('click', () => addDecimalToCurrentNumber())

  domEqualButton.addEventListener('click', () => resolveOperation())

  domResetButton.addEventListener('click', () => resetCalculator())

  domNegativeButton.addEventListener('click', () => toggleNegative())
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
