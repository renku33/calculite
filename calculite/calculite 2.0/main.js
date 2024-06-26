var MAX_DISPLAY_DIGIT_LENGTH = 9

var selectedOperator = ""
var firstOperand = ""
var secondOperand = ""
var result = ""
var isNegative = false

var domNumbersButtons
var domOperatorsButtons

// initialize calculite

function initCalculator(){
    domNumbersButtons = document.querySelectorAll(".numbers button")
    domOperatorsButtons = document.querySelectorAll(".operators button")
    domEqualResetNegativeButtons = document.querySelectorAll(".equal_negative_reset button")

    addEventListenersToDomNumberButtons()
    addEventListenersToDomOperatorButtons()
    addEventListenersToDomEqualResetNegativeButtons()
    changeCalculatorStatus(2, "operators")
}

// add event listeners to our calculator

function addEventListenersToDomNumberButtons(){
    domNumbersButtons.forEach(numberButton => {
        numberButton.addEventListener("click", () => storeNumberValue(numberButton.value) )
    })
}

function addEventListenersToDomOperatorButtons(){
    domOperatorsButtons.forEach(operatorButton => {
        operatorButton.addEventListener("click", () => storeOperatorValue(operatorButton.value) )
    })
}

function addEventListenersToDomEqualResetNegativeButtons(){
    domEqualResetNegativeButtons.forEach(button => {
        button.addEventListener("click", () => storeEqualResetNegativeValue(button.value) )
    })
}

// storing functions

function storeOperatorValue(operatorButtonValue){
    selectedOperator = operatorButtonValue; 
    changeCalculatorStatus(1,"")
    changeCalculatorStatus(3, "numbers")
   
}

function storeNumberValue(numberButtonValue){
    let tempValue
    
    if(!selectedOperator){   
        tempValue = String(firstOperand) + numberButtonValue  // se pasa a string para poder concatenar
        firstOperand = parseFloat(tempValue)
        changeCalculatorStatus(1,firstOperand)
    } else {
        tempValue = String(secondOperand) + numberButtonValue
        secondOperand = parseFloat(tempValue)
        changeCalculatorStatus(1,secondOperand)
    }
    
    validateAllowedLenght()
    changeCalculatorStatus(3, "operators")
}


function storeEqualResetNegativeValue(EqualResetNegativeValue){
    switch(EqualResetNegativeValue){
        case "=":
            validateOperation()
            break
        case "negative":
            toggleNegativePositive()
            break
        case "reset":
            resetCalculator()
            break
    }
}

function updateCalculatorDisplay(displayValue){
    document.getElementById("calculatorDisplay").value = displayValue
}

// main 

function changeCalculatorStatus(optionState, parameterToTransfer){

    // 1 = update calculator display
    // 2 = 
    // 3 = 
    
    switch(optionState){
        case 1: 
            updateCalculatorDisplay(parameterToTransfer)
            break
        case 2:
            disableButtons(parameterToTransfer)
            break
        case 3:
            enableButtons(parameterToTransfer)
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
    isNegative = false
    changeCalculatorStatus(3, "numbers")
    changeCalculatorStatus(1,0)   // se actualiza el display de la calculadora al valor inicial
}

function toggleNegativePositive(){
    if(!selectedOperator){  
        firstOperand = firstOperand * (-1)
        changeCalculatorStatus(1,firstOperand)
    } else {
        secondOperand = secondOperand * (-1)
        changeCalculatorStatus(1, secondOperand)
    }

    isNegative = !isNegative
    validateAllowedLenght()
}

function validateOperation(){
  
    let operationIsPossible = (firstOperand && secondOperand && selectedOperator) // mirar si las variables estan vacias

    if(operationIsPossible){ 
        result = calculateResult()  
        resetCalculator()
        validateAllowedLenght()
        firstOperand = result
        changeCalculatorStatus(1, result)
    } else {
        changeCalculatorStatus(1, firstOperand)
    }
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
            changeCalculatorStatus(2, "numbers")
            if(!isNegative){
                changeCalculatorStatus(2, "negative")
            }
        } else {
            changeCalculatorStatus(3, "numbers")
            changeCalculatorStatus(3, "negative")
        }
    } else {
        if(secondOperandString.length == MAX_DISPLAY_DIGIT_LENGTH){
            changeCalculatorStatus(2, "numbers")
            if(!isNegative){
                changeCalculatorStatus(2, "negative")
            }
        } else {
            changeCalculatorStatus(3, "numbers")
            changeCalculatorStatus(3, "negative")
        }
    }

    if(resultString.length > MAX_DISPLAY_DIGIT_LENGTH){
        result = result.toExponential(2)
    }
}


