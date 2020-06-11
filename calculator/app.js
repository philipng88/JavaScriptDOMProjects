const calculatorDisplay = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand,
};

const inputDigit = digit => {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === '0' ? digit : displayValue + digit;
  }
};

const inputDecimal = decimal => {
  if (calculator.waitingForSecondOperand === true) return;
  if (!calculator.displayValue.includes(decimal))
    calculator.displayValue += decimal;
};

const handleOperator = nextOperator => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};

const resetCalculator = () => {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};

const updateDisplay = () => {
  calculatorDisplay.innerText = calculator.displayValue;
};

keys.addEventListener('click', event => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }
  if (target.classList.contains('key-operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});
updateDisplay();
