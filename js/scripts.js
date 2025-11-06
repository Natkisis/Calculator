class Calculator {
  constructor() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.waitingForNewInput = false;

    this.display = document.querySelector('.screen');
    this.clearButton = document.querySelector('.clear');

    this.init();
  }

  init() {
    this.updateDisplay();

    //numeric buttons
    document.querySelectorAll('[data-number]').forEach(button => {
      button.addEventListener('click', () => {
        this.inputNumber(button.dataset.number);
      })
    });

    //"C" button
    this.clearButton.addEventListener('click', () => {
      this.clear();
    })

    //desimal point 
    document.querySelector('[data-decimal]').addEventListener('click', () => {
      this.inputDecimal();
    })

    //operation
    document.querySelectorAll('[data-operator]').forEach(button => {
      button.addEventListener('click', () => {
        this.inputOperator(button.dataset.operator);
      })
    })

    //button "="
    document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
      this.calculate();
    })

    //adding a keyboard
    document.addEventListener('keydown', (e) => {
      this.handleKeybordInput(e);
    });

  }


  //method for updating the display
  updateDisplay() {
    this.display.textContent = this.currentInput;
  }

  //method for entering numbers
  inputNumber(number) {
    if (this.waitingForNewInput) {
      this.currentInput = number;
      this.waitingForNewInput = false;
    } else {
      this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
    }
    this.updateDisplay();
  }

  //method for cleaning
  clear() {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.waitingForNewInput = false;
    this.updateDisplay();
  }

  //method for the decimal point appearance
  inputDecimal() {
    if (this.waitingForNewInput) {
      this.currentInput = '0.';
      this.waitingForNewInput = false;
    } else if (this.currentInput.indexOf('.') === -1) {
      this.currentInput += ".";

    }
    this.updateDisplay();
  }

  //method for operations
  inputOperator(nextOperator) {

    if (this.operator && !this.waitingForNewInput) {
      this.calculate();
    }

    this.previousInput = this.currentInput;
    this.operator = nextOperator;
    this.waitingForNewInput = true;
  }

  //method for clculation
  calculate() {

    if (this.operator === null || this.waitingForNewInput) {
      return;
    }

    const prevValue = parseFloat(this.previousInput);
    const currentValue = parseFloat(this.currentInput);
    let result;

    switch (this.operator) {
      case 'add':
        result = prevValue + currentValue;
        break;
      case 'subtract':
        result = prevValue - currentValue;
        break;
      case 'multiply':
        result = prevValue * currentValue;
        break;
      case 'divide':
        result = prevValue / currentValue;
        break;
      default:
        return;
    }

    result = Math.round(result * 100000000) / 100000000;

    this.currentInput = result.toString();
    this.operator = null;
    this.previousInput = '';
    this.waitingForNewInput = false;

    this.updateDisplay();
  }

  //method for keybord processing
  handleKeybordInput(e) {
    //  e.preventDefault();

    if (e.key >= '0' && e.key <= '9') {
      this.inputNumber(e.key);

    } else if (e.key === '.') {
      this.inputDecimal();

    } else if (e.key === "Escape" || e.key === 'C' || e.key === 'c') {
      this.clear();

    } else if (e.key === '+') {
      this.inputOperator('add');

    } else if (e.key === '-') {
      this.inputOperator('subtract');

    } else if (e.key === '*') {
      this.inputOperator('multiply');

    } else if (e.key === '/') {
      this.inputOperator('divide');

    } else if (e.key === '=' || e.key === 'Enter') {
      this.calculate();

    } else if (e.key === 'Backspace') {
      this.backspace();
    }
  }

  //method backspace
  backspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);

    } else {
      this.currentInput = '0';
    }

    this.updateDisplay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
})

