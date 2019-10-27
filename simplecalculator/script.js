// Defining a Calculator class
class Calculator {
  constructor(previousOutputTextElement, currentOutputTextElement) {
    this.previousOutputTextElement = previousOutputTextElement;
    this.currentOutputTextElement = currentOutputTextElement;
    this.clear();
  }

  clear() {
    this.previousOutput = '';
    this.currentOutput = '0';
    this.operation = undefined;
    this.resultFlag = false;
  }

  delete() {
    if (this.resultFlag) return;
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOutput.includes(number)) {return};
    if (this.currentOutput.toString() === '0' && number.toString() !== '.') {
      this.currentOutput = number.toString();
    } else {
      this.currentOutput = this.currentOutput.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOutput === '' && this.previousOutput !== '') {
      this.operation = operation;
    }
    if (this.currentOutput === '') return;
    if (this.previousOutput !== '') {
      this.compute();
      this.resultFlag = false;
    }
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = '';
  }

  compute() {
    let computation;
    let prev = parseFloat(this.previousOutput);
    let current = parseFloat(this.currentOutput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOutput = computation;
    this.resultFlag = true;
    this.operation = undefined;
    this.previousOutput = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOutputTextElement.innerText = this.getDisplayNumber(this.currentOutput);
    if (this.operation !== undefined) {
      this.previousOutputTextElement.innerText = `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`;
    } else {
      this.previousOutputTextElement.innerText = '';
    }
  }
}
// Selecting all calculator elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const previousOutputTextElement = document.querySelector('[data-previous-output]');
const currentOutputTextElement = document.querySelector('[data-current-output]');

// Setting the application
const calculator = new Calculator(previousOutputTextElement, currentOutputTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});


equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
/*
Проблемы:
1. Нет возможности вводить отрицательные числа
*/