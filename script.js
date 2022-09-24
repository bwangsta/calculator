const display = document.querySelector(".display p");
const buttons = document.querySelectorAll("button");

let storedNumber = null;
let operator = "";
let displayNumber = "";
let result;
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // if user clicked on a number, display number
        // if user clicked on an operator, clear the display
        // if user clicked on "clear", clear the display
        // if user clicked on "=", show results
        // after clicking on equals, chain if user clicks on an operator
        // reset if user clicks on new number
        let buttonValue = button.value;
        // if storedNumber != null and user clicks on an arithmetic operator, that means that a previous number has already been inputted
        // calculate the result and store the result in storedNumber
        if (operatorClicked(buttonValue) && storedNumber !== null) {
            result = operate(operator, storedNumber, Number(displayNumber));
            display.textContent = result;
            storedNumber = result;
            displayNumber = "";
            operator = buttonValue;
        }
        else if (numberClicked(buttonValue) && operator === "=") {
            displayNumber += buttonValue;
            display.textContent = displayNumber;
            storedNumber = null;
        }
        else if (buttonValue === "clear") {
            clearScreen();
        }
        else if (buttonValue === "=") {
            result = operate(operator, storedNumber, Number(displayNumber))
            display.textContent = result;
            storedNumber = result;
            displayNumber = "";
            operator = buttonValue;
        }
        else if (operatorClicked(buttonValue)) {
            storedNumber = Number(displayNumber);
            displayNumber = "";
            operator = buttonValue;
        }
        else if (numberClicked(buttonValue)) {
            displayNumber += buttonValue;
            display.textContent = displayNumber;
        }
    })
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

function operatorClicked(buttonValue) {
    return ["+", "-", "x", "÷"].includes(buttonValue);
}

function numberClicked(buttonValue) {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(buttonValue);
}

function clearScreen() {
    display.textContent = "0";
    displayNumber = "";
    storedNumber = null;
    operator = "";
}