let displayVal = "0";
const display = document.querySelector("#display");
const calculator = document.querySelector("#calculator");
const buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
let previousKeyType = calculator.dataset.previousKeyType;
let firstOperand = null;
let secondOperand = null; 
let operator = null;
const fontSizeOrig = parseInt(window.getComputedStyle(display, null).fontSize);
let fontSize = parseInt(window.getComputedStyle(display, null).fontSize);

buttonsFunctions();
keyPress();
function buttonsFunctions() {
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            switch(true) {
            case (button.classList.contains("operand")):
                addOperand(button.value);
                addToDisplay();
            break;

            case (button.classList.contains("operator")):
                addOperator(button.value);
                addToDisplay();
            break;

            case (button.id == "equals"):
                calcEquals();
                addToDisplay();
            break;

            case (button.id == "clear"):
                clearDisplay();
                addToDisplay();
            break;

            case (button.id == "decimal"): 
                addDecimal();
                addToDisplay();
            break;

            case (button.id == "percent"):
                toPercent(displayVal);
                addToDisplay();
            break;

            case (button.id == "sign"): 
                switchSign(displayVal);
                addToDisplay();
            break;

            case (button.id == "backspace"):
                backspace();
                addToDisplay();
            break;
            }
            
        })
    })
}
function keyPress () {
    body.addEventListener("keydown", event => {
        console.log(event.key);
        switch(true){

        case (event.key >= 0 && event.key <= 9):
            addOperand(event.key);
            addToDisplay();
        break;

        case (event.key == "*" || event.key == "+" || event.key == "-" || event.key == "/"):
            addOperator(event.key);
            addToDisplay();
        break;

        case (event.key == "=" || event.key =="Enter"):
            calcEquals();
            addToDisplay();
        break;

        case (event.key == "Delete"):
            clearDisplay();
            addToDisplay();
        break;
        
        case (event.key == "."):
            addDecimal();
            addToDisplay();
        break;

        case (event.key == "%"):
            toPercent(displayVal);
            addToDisplay();
        break;

        case (event.key == "F9"):
            switchSign(displayVal);
            addToDisplay();
        break;

        case (event.key == "Backspace"):
            backspace();
            addToDisplay();
        break;
        }
    }
    )}

function addToDisplay(e) {
    display.textContent = displayVal;
    if(displayVal.length >= 8) {
        display.innerText = displayVal.substring(0, 8);
    }
}
function clearDisplay() {
    displayVal = "0";
    firstOperand = null;
    secondOperand = null;
    result = null;
}

function addOperand(operand) {
    if (displayVal == "0" || previousKeyType == "operator" || previousKeyType =="equals") {
        displayVal = operand;
    } else {
        displayVal += operand;
    }
    previousKeyType = "operand";
}

function addOperator(op) {
    if (firstOperand == null) {
        firstOperand = displayVal;
        operator = op;
        let firstOp = operator;
    } else if (secondOperand == null && previousKeyType !== 'operator') {
        firstOp = operator;
        secondOperand = displayVal;
        displayVal = operate(firstOperand, secondOperand, operator);
        firstOperand = displayVal;
    } else if (firstOperand != null && secondOperand != null && previousKeyType !== "operator") {
        firstOp = operator;
        secondOperand = displayVal;
        displayVal = operate(firstOperand, secondOperand, operator);
        firstOperand = displayVal;
        addOnce = true;
    } else if (previousKeyType == "operator") {
        operator = op;
    }
    previousKeyType = "operator";
}

function calcEquals() {
    let result;
    if (operator == null) {
        return false;
    }
    else if (firstOperand == null) {
        firstOperand = displayVal;
    } else if (secondOperand == null){
        secondOperand = displayVal;
        displayVal = operate(firstOperand, secondOperand, operator);
        firstOperand = displayVal;
    } else if (firstOperand != null && secondOperand != null) {
        result = operate(firstOperand, secondOperand, operator);
        firstOperand = result;  
        displayVal = firstOperand;
        result = null;
    }
    previousKeyType = "equals";
}
function switchSign(num) {
    if (displayVal == "No") {
        return false;
    }
    displayVal = (num * -1).toString();
    previousKeyType = "sign";
}

function addDecimal() {
    if (displayVal == "No") {
        return false;
    }
    if (displayVal.includes(".")) {
        return false;
    } else if (previousKeyType === "operator" || previousKeyType == "equals") {
        displayVal = "0.";
    } else {
        displayVal += ".";
    }
    previousKeyType = "decimal";
}
function toPercent(num) {
    if (displayVal == "No") {
        return false;
    }
   displayVal = (num/100).toString();
   previousKeyType = "percent"; 
}

function backspace () {
    if (displayVal == 0 || displayVal == "0" || previousKeyType == "operator") {
        return false;
    } else if (displayVal.length == 1) {
        displayVal = "0";
    } else {
        displayVal = displayVal.slice(0,-1);
    }
    previousKeyType = "backspace";
}

function operate(a, b, oprtr) {
    if (oprtr == "+") {
        return parseFloat(a) + parseFloat(b);
    } else if (oprtr == "-") {
        return parseFloat(a) - parseFloat(b);
    } else if (oprtr == "*") {
        return parseFloat(a) * parseFloat(b);
    } else if (oprtr == "/") {
        if (b == 0) {
            return "No";
        } else {
            return parseFloat(a) / parseFloat(b);
        }
    }
}
