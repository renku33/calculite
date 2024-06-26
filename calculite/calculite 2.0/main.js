var MAX_DISPLAY_DIGIT_LENGTH = 9

var selectedOperator = ""
var firstOperand = ""
var secondOperand = ""

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
}

function storeNumberValue(numberButtonValue){
    let tempValue
    if(!selectedOperator){   // falta validar si es resultado o no
        tempValue = String(firstOperand) + numberButtonValue  // se pasa a string para poder concatenar
        firstOperand = parseFloat(tempValue)
    } else {
        tempValue = String(secondOperand) + numberButtonValue
        secondOperand = parseFloat(tempValue)
    }
}

function storeEqualResetNegativeValue(EqualResetNegativeValue){
    switch(EqualResetNegativeValue){
        case "=":
            
            break
        case "negative":
            
            break
        case "reset":
            
            break
    }
}

function resetCalculator(){

}


// logica calculite
