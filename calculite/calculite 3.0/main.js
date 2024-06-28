// constantes
const MAX_LENGTH_DIGIT_DISPLAY = 9

// variables
let current = ""
let operator = ""

// estados booleanos
let pendingResult = false
let pendingReset = false
let operatorSelected = false
let maxDigit = false
let isNegative = false
let newNum = false



function iniciarCalculadora(){
    // cojer los botones del dom
    // poner el display a 0
    // deshabilitar todos los botones menos los numeros
    // llamar funcion que pone los eventListeners 
}

function añadirLosEventListeners(){
    // añadir event listener a todos los botones
}

function botonesNumeros(valorNum){
    // current += valorNum
    // newNum = true
    // updateCal()
}

function botonesOperadores(valorOp){
    // operator = valorOp
    // operatorSelected = true
    // updateCal()
}

function botonZero(valorZero){
    // current += valorZero
    // newNum = true
    // updateCal()
}

function botonComa(valorComa){
    // current += valorComa
    // newNum = true
    // updateCal()
}

function botonIgual(){
    // pendingResult = true
    // updateCal()
}

function botonNegative(){
    // isNegative = !isNegative
    // updateCal()
}

function botonReset(){
    // pendingReset= true
    // updateCal()
}


// -----------------------------------------------------------------------MAIN--------------------------------------------------------------

function updateCal(){
    let num1
    let num2

    if(newNum){
        if(operatorSelected){
            num2 = putCurrentIntoNum()
        } else {
            num1 = putCurrentIntoNum()
        }
    }

    if(pendingResult){
        calcular(num1,num2)
    }

    if(isNegative){
        if(operatorSelected){
            toggleNegativePositive(num2)
        } else {
            toggleNegativePositive(num1)
        }
    }

    if(pendingReset){
        reset()
    }
}

