const previousOperandEl =
    document.getElementById('previous-operand');

const currentOperandEl =
    document.getElementById('current-operand');


let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;



function updateDisplay() {

    currentOperandEl.textContent = currentOperand;

    previousOperandEl.textContent =
        operation != null
            ? previousOperand + ' ' + operation
            : '';
}




function appendNumber(number) {

    if (shouldResetScreen) {

        currentOperand =
            number === '.' ? '0' : '';

        shouldResetScreen = false;
    }

    if (
        number === '.' &&
        currentOperand.includes('.')
    ) {
        return;
    }

    if (
        currentOperand === '0' &&
        number !== '.'
    ) {
        currentOperand = number;
    } else {
        currentOperand += number;
    }

    updateDisplay();
}



function chooseOperation(op) {

    if (
        currentOperand === '' ||
        currentOperand === 'Error'
    ) {
        return;
    }

    if (previousOperand !== '') {
        compute();
    }

    operation = op;

    previousOperand = currentOperand;

    shouldResetScreen = true;

    updateDisplay();
}




function compute() {

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (
        isNaN(prev) ||
        isNaN(current)
    ) {
        return;
    }

    let result;

    switch (operation) {

        case '+':
            result = prev + current;
            break;

        case '-':
        case '−':
            result = prev - current;
            break;

        case '*':
        case '×':
            result = prev * current;
            break;

        case '÷':
            result =
                current === 0
                    ? 'Error'
                    : prev / current;
            break;

        case '%':
            result = (prev * current) / 100;
            break;

        default:
            return;
    }

    currentOperand = formatResult(result);

    operation = undefined;

    previousOperand = '';

    shouldResetScreen = true;

    updateDisplay();
}




function scientific(func) {

    if (currentOperand === 'Error') {
        return;
    }

    const num = parseFloat(currentOperand);

    if (isNaN(num)) {
        return;
    }

    let result;

    switch (func) {

        case 'sin':
            result =
                Math.sin(num * Math.PI / 180);
            break;

        case 'cos':
            result =
                Math.cos(num * Math.PI / 180);
            break;

        case 'tan':

            result =
                Math.abs(num % 180) === 90
                    ? 'Error'
                    : Math.tan(
                        num * Math.PI / 180
                    );

            break;

        case 'sqrt':

            result =
                num < 0
                    ? 'Error'
                    : Math.sqrt(num);

            break;

        case 'square':

            result = num * num;

            break;

        case 'inv':

            result =
                num === 0
                    ? 'Error'
                    : 1 / num;

            break;

        case 'abs':

            result = Math.abs(num);

            break;

        case 'neg':

            result = -num;

            break;

        case 'fact':

            if (
                num < 0 ||
                !Number.isInteger(num)
            ) {

                result = 'Error';

            } else if (num > 170) {

                result = 'Infinity';

            } else {

                result = 1;
                for (
                    let i = 2;
                    i <= num;
                    i++
                ) {
                    result *= i;
                }
            }

            break;

        default:
            return;
    }

    currentOperand = formatResult(result);

    shouldResetScreen = true;

    updateDisplay();
}




function insertConstant(type) {

    if (
        shouldResetScreen ||
        currentOperand === '0'
    ) {

        currentOperand = '';

        shouldResetScreen = false;
    }

    if (type === 'pi') {

        currentOperand =
            Math.PI.toString();
    }

    updateDisplay();
}




function formatResult(value) {

    if (
        value === 'Error' ||
        value === 'Infinity'
    ) {
        return value;
    }

    if (Number.isInteger(value)) {

        return value.toString();
    }

    return parseFloat(
        value.toFixed(10)
    ).toString();
}




function clearAll() {

    currentOperand = '0';

    previousOperand = '';

    operation = undefined;

    shouldResetScreen = false;

    updateDisplay();
}




function deleteNumber() {

    if (shouldResetScreen) {
        return;
    }

    if (
        currentOperand.length === 1 ||
        currentOperand === 'Error'
    ) {

        currentOperand = '0';

    } else {

        currentOperand =
            currentOperand.slice(0, -1);
    }

    updateDisplay();
}




document
    .querySelectorAll('button')
    .forEach(button => {

        button.addEventListener(
            'click',
            () => {

                const action =
                    button.dataset.action;

                const value =
                    button.dataset.value;


                if (action === 'number') {
                    appendNumber(value);
                }

                if (action === 'operator') {
                    chooseOperation(value);
                }

                if (action === 'equals') {
                    compute();
                }

                if (action === 'clear') {
                    clearAll();
                }

                if (action === 'delete') {
                    deleteNumber();
                }

                if (action === 'sci') {
                    scientific(value);
                }

                if (action === 'constant') {
                    insertConstant(value);
                }
            }
        );
    });




document.addEventListener(
    'keydown',
    event => {

        if (
            event.key >= '0' &&
            event.key <= '9'
        ) {

            appendNumber(event.key);
        }

        if (event.key === '.') {

            appendNumber('.');
        }

        if (event.key === '+') {

            chooseOperation('+');
        }

        if (event.key === '-') {

            chooseOperation('-');
        }

        if (
            event.key === '*' ||
            event.key.toLowerCase() === 'x'
        ) {

            chooseOperation('*');
        }

        if (event.key === '/') {

            event.preventDefault();

            chooseOperation('÷');
        }

        if (event.key === '%') {

            chooseOperation('%');
        }

        if (
            event.key === 'Enter' ||
            event.key === '='
        ) {

            event.preventDefault();

            compute();
        }

        if (event.key === 'Backspace') {

            deleteNumber();
        }

        if (event.key === 'Escape') {

            clearAll();
        }

        if (
            event.key.toLowerCase() === 'p'
        ) {

            insertConstant('pi');
        }
    }
);
