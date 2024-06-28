// Constantes
const MAX_DISPLAY_DIGIT_LENGTH = 9

// Variables
let firstOperand = 0
let currentOperand = ''
let operator = ''

// Booleans
let pendingReset = false
let hasResult = false

// Buttons
let domNumberButtons
let domOperatorsButtons
let domEqualButton
let domResetButton
let domNegativeButton
let domZeroButton
let domDecimalButton

function initCalculator () {
  domNumberButtons = document.querySelectorAll('.numbers button')
  domOperatorsButtons = document.querySelectorAll('.operators button')
  domEqualButton = document.getElementById('equal')
  domResetButton = document.getElementById('reset')
  domNegativeButton = document.getElementById('toggleNegative')
  domZeroButton = document.getElementById('0')
  domDecimalButton = document.getElementById('decimal')

  addEventListeners()
}

function addEventListeners () {
  domNumberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => storeNumberValue(numberButton.value))
  })

  domOperatorsButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => storeOperatorValue(operatorButton.value))
  })

  domZeroButton.addEventListener('click', () => addZero())

  domDecimalButton.addEventListener('click', () => addDecimalSeparator())

  domEqualButton.addEventListener('click', () => hacerCalculo())

  domResetButton.addEventListener('click', () => resetCalculator())

  domNegativeButton.addEventListener('click', () => toggleNegative())
}

function storeNumberValue (numberValue) {
  if (pendingReset) {
    pendingReset = false
    currentOperand = ''
  }
  currentOperand += numberValue
  updateCalculatorStatus()
}

function storeOperatorValue (operatorValue) {
  operator = operatorValue
  firstOperand = Number(currentOperand)
  pendingReset = true
  hasResult = false
  updateCalculatorStatus()
}

function addZero () {
  if (currentOperand.includes('.') || currentOperand != '') {
    if (pendingReset) {
      pendingReset = false
      currentOperand = ''
    }
    currentOperand += '0'
  }
  updateCalculatorStatus()
}

function addDecimalSeparator () {
  currentOperand = currentOperand.replace('.', '')
  if (currentOperand == '') {
    currentOperand += '0'
  }
  currentOperand += '.'
  updateCalculatorStatus()
}

function hacerCalculo () {
  if (operator) {
    let result = calculateResult()
    result = formatResult(result)
    currentOperand = result
    hasResult = true
    operator = ''
  } else {
    resetCalculator()
  }

  updateCalculatorStatus()
}

function resetCalculator () {
  currentOperand = ''
  operator = ''
  hasResult = false
  updateCalculatorStatus()
}

function toggleNegative () {
  if (Number(currentOperand) != 0) {
    if (currentOperand.startsWith('-')) {
      currentOperand = currentOperand.replace('-', '')
    } else {
      currentOperand = '-' + currentOperand
    }
  }
  updateCalculatorStatus()
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
  let resultString = String(result)

  if (resultString.length > MAX_DISPLAY_DIGIT_LENGTH) {
    result = result.toExponential(2)
  }
  return result
}
// -----------------------------------------------------------------------MAIN--------------------------------------------------------------

function updateCalculatorStatus () {
  let valueToDisplay = currentOperand

  if (valueToDisplay == '') {
    valueToDisplay = 0
  }
  document.getElementById('calculatorDisplay').value = String(valueToDisplay).replace('.', ',')

  if (currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH || hasResult) {
    disableNumericButtons()
    if (Number(currentOperand) > 0 || hasResult) {
      disableToggleNegativeButton()
    }
    return
  } else {
    enableNumericButtons()
    enableToggleNegativeButton()
  }

  if (operator != '') {
    enableNumericButtons()
    enableToggleNegativeButton()
  }
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

function disableNumericButtons () {
  disableNumberButtons()
  disableCommaButton()
  disableZeroButton()
}

function enableNumericButtons () {
  enableNumberButtons()
  enableCommaButton()
  enableZeroButton()
}
