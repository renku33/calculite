var MAX_DISPLAY_DIGIT_LENGTH = 9

var selectedOperator = ""
var firstOperand = ""
var secondOperand = ""

var domNumbersButtons
var domOperatorsButtons


function initCalculator(){
    domNumbersButtons = document.querySelectorAll(".numbers button")
    domOperatorsButtons = document.querySelectorAll(".operators button")

    addEventListenersToDomNumberButtons()
}

function addEventListenersToDomNumberButtons(){
    domNumbersButtons.forEach(numberButton => {
        numberButton.addEventListener("click", () => storeValue(numberButton.value) )
    });
}

function storeValue(numberButtonValue){
    let tempValue
    if(!selectedOperator){
        tempValue = String(firstOperand) + numberButtonValue  // se pasa a string para poder concatenar
        firstOperand = parseFloat(tempValue)
    } else {
        tempValue = String(secondOperand) + numberButtonValue
        secondOperand = parseFloat(tempValue)
    }
}