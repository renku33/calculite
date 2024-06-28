// constantes
const MAX_LENGTH_DIGIT_DISPLAY = 9

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



function iniciarCalculadora(){
    domNumbersButtons = document.querySelectorAll('.numbers button')
    domOperatorsButtons = document.querySelectorAll('.operators button')
    domEqualButton = document.getElementById('equal')
    domResetButton = document.getElementById('reset')
    domNegativeButton = document.getElementById('toggleNegative')
    domZeroButton = document.getElementById('zero')
    domDecimalButton = document.getElementById('decimal')


    // poner el display a 0
    // deshabilitar todos los botones menos los numeros
    // llamar funcion que pone los eventListeners 
}

function añadirLosEventListeners(){
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
    if (currentOperand != "") {
        currentOperand += '0'
    }
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
    // pendingResult = true
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

function formatResult(result) {
    let resultString = String(result)
    if (resultString.length > MAX_DISPLAY_DIGIT_LENGTH) {
        result = result.toExponential(2)
    }
    return result
}
// -----------------------------------------------------------------------MAIN--------------------------------------------------------------

function updateCalculatorStatus(){
    document.getElementById('calculatorDisplay').value = currentOperand

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

