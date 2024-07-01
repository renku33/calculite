const MAX_DISPLAY_DIGIT_LENGTH = 9

let selectedOperator = ''
let firstOperand = ''
let secondOperand = ''
let result = ''
let isCurrentOperandNegative = false
let currentOperand = ''

let domNumbersButtons
let domOperatorsButtons
let domZeroDecimalButtons
let domEqualResetNegativeButtons

// hacer clipboard

// initialize calculite
// eslint-disable-next-line no-unused-vars
function initCalculator () {
  gatherDomElements()
  addEventListenersToDomButtons()
  changeCalculatorStatus('disableButton', 'operators')
}
// Gather dom elements
function gatherDomElements () {
  domNumbersButtons = document.querySelectorAll('.numbers button')
  domOperatorsButtons = document.querySelectorAll('.operators button')
  domEqualResetNegativeButtons = document.querySelectorAll('.equal_negative_reset button')
  domZeroDecimalButtons = document.querySelectorAll('.zero_decimal button')
}
// add event listeners to our calculator
function addEventListenersToDomButtons () {
  addEventListenersToDomNumberButtons()
  addEventListenersToDomZeroDecimalButtons()
  addEventListenersToDomOperatorButtons()
  addEventListenersToDomEqualResetNegativeButtons()
}
function addEventListenersToDomNumberButtons () {
  domNumbersButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => storeNumberValue(numberButton.value))
  })
}
function addEventListenersToDomZeroDecimalButtons () {
  domZeroDecimalButtons.forEach(button => {
    button.addEventListener('click', () => storeZeroDecimalValue(button.value))
  })
}
function addEventListenersToDomOperatorButtons () {
  domOperatorsButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => storeOperatorValue(operatorButton.value))
  })
}
function addEventListenersToDomEqualResetNegativeButtons () {
  domEqualResetNegativeButtons.forEach(button => {
    button.addEventListener('click', () => equalResetNegativeFunctions(button.value))
  })
}

// storing functions
function storeNumberValue (numberButtonValue) {
  let tempStringValue

  tempStringValue = String(currentOperand) + numberButtonValue // se pasa a string para poder concatenar
  currentOperand = parseFloat(tempStringValue)
  changeCalculatorStatus('updateDisplay', currentOperand)

  setCurrentOperand()
  validateAllowedLenght()
  changeCalculatorStatus('enableButton', 'operators')
}

function storeOperatorValue (operatorButtonValue) {
  selectedOperator = operatorButtonValue
  changeCalculatorStatus('updateDisplay', '') // hacer que no se borre el numero sino que se actualice por el segundo (toDo)
  changeCalculatorStatus('enableButton', 'numbers')
  changeCalculatorStatus('enableButton', 'zero_decimal')
  currentOperand = ''
}

function equalResetNegativeFunctions (equalResetNegativeValue) {
  switch (equalResetNegativeValue) {
    case '=':
      const operationIsPossible = validateOperation()
      if (operationIsPossible) {
        result = calculateResult()
        resetCalculator() // resetea el secondOperator
        validateAllowedLenght() // exclusivamente para el result
        currentOperand = result
        changeCalculatorStatus('updateDisplay', result)
        changeCalculatorStatus('disableButton', 'numbers')
        changeCalculatorStatus('disableButton', 'zero_decimal')
      } else {
        changeCalculatorStatus('updateDisplay', currentOperand)
      }
      break
    case 'negative':
      toggleNegativePositive()
      break
    case 'reset':
      resetCalculator()
      break
  }
}

function storeZeroDecimalValue (ZeroDecimalValue) {
  let tempStringValue
  switch (ZeroDecimalValue) {
    case '0':
      if (firstOperand) {
        tempStringValue = String(currentOperand) + ZeroDecimalValue // se pasa a string para poder concatenar
        currentOperand = parseFloat(tempStringValue)
        validateAllowedLenght()
        changeCalculatorStatus('updateDisplay', currentOperand)
      }
      setCurrentOperand()
      break
    case '.':
      // la meto en la posicion 9
      if (!currentOperand) {
        currentOperand = '0.'
      }

      currentOperand = String(currentOperand)
      currentOperand = currentOperand.replace('.', '')
      currentOperand = currentOperand + ZeroDecimalValue // se pasa a string para poder concatenar

      setCurrentOperand()
      changeCalculatorStatus('updateDisplay', currentOperand)
      changeCalculatorStatus('disableButton', 'operators')
      break
  }
}

function updateCalculatorDisplay (displayValue) {
  document.getElementById('calculatorDisplay').value = String(displayValue).replace('.', ',')
}

// main

/**
 * Esta funcion hace de puente entre los estados que puede tener la calculadora
 * @param {String} optionState = el indice del puente (accion a ejecutar)
 * @param {String} parameterToTransfer = el parametro que le enviara al metodo siguiente segun el indice
 * @see updateCalculatorDisplay
 * @see disableButton
 * @see enableButton
 */
function changeCalculatorStatus (optionState, parameterToTransfer) {
  switch (optionState) {
    case 'updateDisplay':
      updateCalculatorDisplay(parameterToTransfer)
      break
    case 'disableButton':
      disableButtons(parameterToTransfer)
      break
    case 'enableButton':
      enableButtons(parameterToTransfer)
      break
  }
}

// logica calculite
function disableButtons (buttonToBlock) {
  const buttons = document.querySelectorAll(`.${buttonToBlock} button`)

  buttons.forEach(function (button) {
    button.disabled = true
  })
}

function setCurrentOperand () {
  if (!selectedOperator) {
    firstOperand = currentOperand
  } else {
    secondOperand = currentOperand
  }
}

function enableButtons (buttonToBlock) {
  const buttons = document.querySelectorAll(`.${buttonToBlock} button`)

  buttons.forEach(function (button) {
    button.disabled = false
  })
}

function resetCalculator () {
  selectedOperator = ''
  firstOperand = ''
  secondOperand = ''
  currentOperand = ''
  isCurrentOperandNegative = false
  changeCalculatorStatus('enableButton', 'numbers')
  changeCalculatorStatus('enableButton', 'zero_decimal')
  changeCalculatorStatus('updateDisplay', 0) // se actualiza el display de la calculadora al valor inicial
}

function toggleNegativePositive () {
  currentOperand = currentOperand * (-1)
  changeCalculatorStatus('updateDisplay', currentOperand)
  setCurrentOperand()

  isCurrentOperandNegative = !isCurrentOperandNegative
  validateAllowedLenght()
}

function validateOperation () {
  if (!secondOperand && firstOperand) {
    secondOperand = firstOperand
  }
  return (firstOperand && selectedOperator) // mirar si las variables estan vacias
}

function calculateResult () {
  let result

  switch (selectedOperator) {
    case '+':
      result = firstOperand + secondOperand
      break
    case '-':
      result = firstOperand - secondOperand
      break
    case '/':
      if (secondOperand == 0) {
        result = 'error'
      } else {
        result = firstOperand / secondOperand
      }
      break
    case '*':
      result = firstOperand * secondOperand
      break
  }
  return result
}

function validateAllowedLenght () {
  const currentOperandString = String(currentOperand) // se pasa a string para poder medir la largura
  const resultString = String(result)

  validateOperandLength(currentOperandString)

  if (resultString.length > MAX_DISPLAY_DIGIT_LENGTH) {
    result = result.toExponential(2)
  } else if (resultString.length >= MAX_DISPLAY_DIGIT_LENGTH) {
    changeCalculatorStatus('disableButton', 'numbers')
    changeCalculatorStatus('disableButton', 'zero_decimal')
    changeCalculatorStatus('disableButton', 'negative')
  }
}

function validateOperandLength (operand) {
  if (operand.length >= MAX_DISPLAY_DIGIT_LENGTH) {
    changeCalculatorStatus('disableButton', 'numbers')
    changeCalculatorStatus('disableButton', 'zero_decimal')
    if (!isCurrentOperandNegative) {
      changeCalculatorStatus('disableButton', 'negative')
    }
  } else {
    changeCalculatorStatus('enableButton', 'zero_decimal')
    changeCalculatorStatus('enableButton', 'numbers')
    changeCalculatorStatus('enableButton', 'negative')
  }
}
