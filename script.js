const display = document.querySelector(".display p");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

let storedNumber = null;
let operatorType = "";
let displayNumber = "";
let result;

clearBtn.addEventListener("click", clearScreen);
deleteBtn.addEventListener("click", backspace);
equalBtn.addEventListener("click", () => {
    // if user clicked on "=", show results
    result = operate(operatorType, storedNumber, Number(displayNumber))
    display.textContent = result;
    storedNumber = result;
    displayNumber = "";
    operatorType = equalBtn.value;
});

numbers.forEach(number => {
    number.addEventListener("click", () => {
        // reset if user clicks on a number right after equal sign
        if (operatorType === "=") {
            displayNumber += number.value;
            display.textContent = displayNumber;
            storedNumber = null;
        }
        // if user clicked on a number, display number
        else {
            displayNumber += number.value;
            display.textContent = displayNumber;
        }
    });
});
operators.forEach(operator => {
    // if user clicked on an operator, clear the display
    operator.addEventListener("click", () => {
        // Chain if user clicks on an operator
        if (storedNumber !== null) {
            result = operate(operatorType, storedNumber, Number(displayNumber));
            display.textContent = result;
            storedNumber = result;
            displayNumber = "";
            operatorType = operator.value;
        }
        else {
            storedNumber = Number(displayNumber);
            displayNumber = "";
            operatorType = operator.value;
        }
    });
});

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "÷":
            result = divide(num1, num2);
            break;
    }
    return result;
}

function backspace() {
    displayNumber = displayNumber.slice(0, -1);
    display.textContent = displayNumber;
}

function clearScreen() {
    display.textContent = "0";
    displayNumber = "";
    storedNumber = null;
    operatorType = "";
}