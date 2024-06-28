// constantes
const MAX_DISPLAY_DIGIT_LENGTH = 9

// variables
let firstOperand = 0
let currentOperand = ""
let operator = ""

// estados booleanos
let pendingResult = false
let pendingReset = false
let operatorSelected = false
let maxDigit = false
let isNegative = false
let newNum = false

function initCalculator(){
    domNumbersButtons = document.querySelectorAll('.numbers button')
    domOperatorsButtons = document.querySelectorAll('.operators button')
    domEqualButton = document.getElementById('equal')
    domResetButton = document.getElementById('reset')
    domNegativeButton = document.getElementById('toggleNegative')
    domZeroButton = document.getElementById('0')
    domDecimalButton = document.getElementById('decimal')

    addEventListeners()
}

function addEventListeners(){
    domNumbersButtons.forEach(numberButton => {
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

function storeNumberValue(numberValue){
    if (pendingReset) {
        pendingReset = false
        currentOperand = ''
    }
    currentOperand += numberValue
    // newNum = true
    updateCalculatorStatus()
}

function storeOperatorValue(operatorValue){
    operator = operatorValue
    firstOperand = parseFloat(currentOperand)
    pendingReset = true
    // operatorSelected = true
    updateCalculatorStatus()
}

function addZero(){
    if (pendingReset) {
        pendingReset = false
        currentOperand = ''
    }
    currentOperand += '0'
    // newNum = true
    updateCalculatorStatus()
}

function addDecimalSeparator(){
    currentOperand = currentOperand.replace('.', '')
    currentOperand += '.'
    // newNum = true
    updateCalculatorStatus()
}

function hacerCalculo(){
    let result = calculateResult()
    result = formatResult(result)
    currentOperand = result

    updateCalculatorStatus()
}

function resetCalculator(){
    currentOperand = ""
    operator = ""
    // pendingReset= true
    updateCalculatorStatus()
}

function toggleNegative(){
    if(currentOperand.startsWith('-')) {
        currentOperand.replace('-', '')
    } else {
        currentOperand = '-' + currentOperand
    }

    updateCalculatorStatus()
}

function calculateResult() {
    let result

    switch (operator) {
        case '+':
            result = firstOperand + parseFloat(currentOperand)
            break
        case '-':
            result = firstOperand - parseFloat(currentOperand)
            break
        case '/':
            if (parseFloat(currentOperand) == 0) {
                result = 'error'
            } else {
                result = firstOperand / parseFloat(currentOperand)
            }
            break
        case '*':
            result = firstOperand * parseFloat(currentOperand)
            break
    }

    return result
}

function formatResult(result) {
    let resultString = String(result)
    if (resultString.length > MAX_DISPLAY_DIGIT_LENGTH) {
        result = result.toExponential(2)
    }
    return result
}
// -----------------------------------------------------------------------MAIN--------------------------------------------------------------

function updateCalculatorStatus(){
    document.getElementById('calculatorDisplay').value = String(currentOperand).replace('.', ',')

    // if(pendingResult){
    //     calcular(num1,num2)
    // }

    // if(isNegative){
    //     if(operatorSelected){
    //         toggleNegativePositive(num2)
    //     } else {
    //         toggleNegativePositive(num1)
    //     }
    // }

    // if(pendingReset){
    //     reset()
    // }
}

