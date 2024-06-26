var MAX_DISPLAY_DIGIT_LENGTH = 9

var selectedOperator = ""
var firstOperand = ""
var secondOperand = ""
var result = ""
var isCurrentOperandNegative = false
var domNumbersButtons
var domOperatorsButtons
var domZeroDecimalButtons

// initialize calculite

function initCalculator(){
    domNumbersButtons = document.querySelectorAll(".numbers button")
    domOperatorsButtons = document.querySelectorAll(".operators button")
    domEqualResetNegativeButtons = document.querySelectorAll(".equal_negative_reset button")
    domZeroDecimalButtons = document.querySelectorAll(".zero_decimal button")

    addEventListenersToDomNumberButtons()
    addEventListenersToDomOperatorButtons()
    addEventListenersToDomEqualResetNegativeButtons()
    addEventListenersToDomZeroDecimalButtons()
    changeCalculatorStatus("disableButton", "operators")
}

// add event listeners to our calculator

function addEventListenersToDomNumberButtons(){
    domNumbersButtons.forEach(numberButton => {
        numberButton.addEventListener("click", () => storeNumberValue(numberButton.value) )
    })
}

function addEventListenersToDomZeroDecimalButtons(){
    domZeroDecimalButtons.forEach(button => {
        button.addEventListener("click", () => storeZeroDecimalValue(button.value) )
    })
}

function addEventListenersToDomOperatorButtons(){
    domOperatorsButtons.forEach(operatorButton => {
        operatorButton.addEventListener("click", () => storeOperatorValue(operatorButton.value) )
    })
}

function addEventListenersToDomEqualResetNegativeButtons(){
    domEqualResetNegativeButtons.forEach(button => {
        button.addEventListener("click", () => EqualResetNegativeFunctions(button.value) )
    })
}

// storing functions

function storeOperatorValue(operatorButtonValue){
    selectedOperator = operatorButtonValue; 
    changeCalculatorStatus("updateDisplay","") // hacer que no se borre el numero sino que se actualice por el segundo (toDo)
    changeCalculatorStatus("enableButton", "numbers")
   
}

function storeNumberValue(numberButtonValue){
    let tempStringValue
    
    if(!selectedOperator){   
        tempStringValue = String(firstOperand) + numberButtonValue  // se pasa a string para poder concatenar
        firstOperand = parseFloat(tempStringValue)
        changeCalculatorStatus("updateDisplay",firstOperand)
    } else {
        tempStringValue = String(secondOperand) + numberButtonValue
        secondOperand = parseFloat(tempStringValue)
        changeCalculatorStatus("updateDisplay",secondOperand)
    }
    
    validateAllowedLenght()
    changeCalculatorStatus("enableButton", "operators")
}


function EqualResetNegativeFunctions(EqualResetNegativeValue){
    switch(EqualResetNegativeValue){
        case "=":
            let operationIsPossible = validateOperation()
            if(operationIsPossible){ 
                result = calculateResult()  
                resetCalculator()
                validateAllowedLenght()
                firstOperand = result
                changeCalculatorStatus("updateDisplay", result)
            } else {
                changeCalculatorStatus("updateDisplay", firstOperand)
            }
            break
        case "negative":
            toggleNegativePositive()
            break
        case "reset":
            resetCalculator()
            break
    }
}

function storeZeroDecimalValue(ZeroDecimalValue){
    switch(ZeroDecimalValue){
        case "0":
            let tempStringValue
            if(!selectedOperator){   
                if(firstOperand){
                    tempStringValue = String(firstOperand) + ZeroDecimalValue  // se pasa a string para poder concatenar
                    firstOperand = parseFloat(tempStringValue)
                    changeCalculatorStatus("updateDisplay",firstOperand)
                }
            } else {
              // falta por hacer 
            }
            break
        case ".":
            
            break
    }
}

function updateCalculatorDisplay(displayValue){
    document.getElementById("calculatorDisplay").value = String(displayValue).replace('.', ',')
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
function changeCalculatorStatus(optionState, parameterToTransfer){
    switch(optionState){
        case "updateDisplay": 
            updateCalculatorDisplay(parameterToTransfer)
            break
        case "disableButton":
            disableButtons(parameterToTransfer)
            break
        case "enableButton":
            enableButtons(parameterToTransfer)
            break
    }
}


// logica calculite
function disableButtons(buttonToBlock){
    let buttons = document.querySelectorAll(`.${buttonToBlock} button`);

    buttons.forEach(function(button) {
        button.disabled = true;
    });
}

function enableButtons(buttonToBlock){
    let buttons = document.querySelectorAll(`.${buttonToBlock} button`);

    buttons.forEach(function(button) {
        button.disabled = false;
    });
}

function resetCalculator(){
    selectedOperator = ""
    firstOperand = ""
    secondOperand = ""
    isCurrentOperandNegative = false
    changeCalculatorStatus("enableButton", "numbers")
    changeCalculatorStatus("updateDisplay",0)   // se actualiza el display de la calculadora al valor inicial
}

function toggleNegativePositive(){
    if(!selectedOperator){  
        firstOperand = firstOperand * (-1)
        changeCalculatorStatus("updateDisplay",firstOperand)
    } else {
        secondOperand = secondOperand * (-1)
        changeCalculatorStatus("updateDisplay", secondOperand)
    }

    isCurrentOperandNegative = !isCurrentOperandNegative
    validateAllowedLenght()
}

function validateOperation(){
    if(!secondOperand && firstOperand){
        secondOperand = firstOperand
    }
    return (firstOperand && selectedOperator) // mirar si las variables estan vacias
}

function calculateResult(){
    let result

    switch(selectedOperator){
        case "+":
            result = firstOperand + secondOperand
            break
        case "-":
            result = firstOperand - secondOperand
            break
        case "/":
            if(secondOperand == 0){
                result = "error"
            } else {
                result = firstOperand / secondOperand
            }
            break
        case "*":
            result = firstOperand * secondOperand
            break
    }

    return result
}

function validateAllowedLenght(){
    let firstOperandString = String(firstOperand) // se pasa a string para poder medir la largura
    let secondOperandString = String(secondOperand)
    let resultString = String(result)

    if(!selectedOperator){  
        if(firstOperandString.length == MAX_DISPLAY_DIGIT_LENGTH){ 
            changeCalculatorStatus("disableButton", "numbers")
            if(!isCurrentOperandNegative){
                changeCalculatorStatus("disableButton", "negative")
            }
        } else {
            changeCalculatorStatus("enableButton", "numbers")
            changeCalculatorStatus("enableButton", "negative")
        }
    } else {
        if(secondOperandString.length == MAX_DISPLAY_DIGIT_LENGTH){
            changeCalculatorStatus("disableButton", "numbers")
            if(!isCurrentOperandNegative){
                changeCalculatorStatus("disableButton", "negative")
            }
        } else {
            changeCalculatorStatus("enableButton", "numbers")
            changeCalculatorStatus("enableButton", "negative")
        }
    }

    if(resultString.length > MAX_DISPLAY_DIGIT_LENGTH){
        result = result.toExponential(2)
    }
}


