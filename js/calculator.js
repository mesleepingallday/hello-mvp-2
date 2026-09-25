'use strict';

export const OPERATOR_LABELS = Object.freeze({
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷'
});

export class CalculatorModel {
  constructor() {
    this.reset();
    this.lastEvent = 'init';
    this.lastValue = '—';
  }

  reset() {
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.justCalculated = false;
    this.error = false;
    this.completedExpression = '';
  }

  setLastInteraction(eventName, value) {
    this.lastEvent = eventName;
    this.lastValue = value ?? '—';
  }

  inputNumber(digit) {
    if (this.error || this.justCalculated) this.reset();

    if (this.waitingForOperand) {
      this.currentInput = digit;
      this.waitingForOperand = false;
      return;
    }

    this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
  }

  inputDecimal() {
    if (this.error || this.justCalculated) {
      this.reset();
      this.currentInput = '0.';
      return;
    }

    if (this.waitingForOperand) {
      this.currentInput = '0.';
      this.waitingForOperand = false;
      return;
    }

    if (!this.currentInput.includes('.')) this.currentInput += '.';
  }

  chooseOperator(nextOperator) {
    if (this.error) return;

    const inputValue = Number(this.currentInput);

    if (this.operator && this.waitingForOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(this.firstOperand, this.operator, inputValue);
      if (result === null) {
        this.setError();
        return;
      }
      this.currentInput = this.formatResult(result);
      this.firstOperand = result;
    }

    this.operator = nextOperator;
    this.waitingForOperand = true;
    this.justCalculated = false;
  }

  calculate(a, operator, b) {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? null : a / b;
      default: return b;
    }
  }

  performEquals() {
    if (this.error || this.operator === null || this.firstOperand === null || this.waitingForOperand) return;

    const secondOperand = Number(this.currentInput);
    const completed = `${this.formatDisplayNumber(this.firstOperand)} ${OPERATOR_LABELS[this.operator]} ${this.formatDisplayNumber(secondOperand)} =`;
    const result = this.calculate(this.firstOperand, this.operator, secondOperand);

    if (result === null) {
      this.setError(completed);
      return;
    }

    this.currentInput = this.formatResult(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.justCalculated = true;
    this.error = false;
    this.completedExpression = completed;
  }

  backspace() {
    if (this.error || this.justCalculated) {
      this.reset();
      return;
    }
    if (this.waitingForOperand) return;

    if (this.currentInput.length <= 1 || (this.currentInput.length === 2 && this.currentInput.startsWith('-'))) {
      this.currentInput = '0';
    } else {
      this.currentInput = this.currentInput.slice(0, -1);
    }
  }

  setError(expression = '') {
    this.currentInput = 'Error';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.justCalculated = false;
    this.error = true;
    this.completedExpression = expression;
  }

  formatResult(value) {
    if (!Number.isFinite(value)) return 'Error';
    const rounded = Math.round((value + Number.EPSILON) * 1e10) / 1e10;
    return String(rounded);
  }

  formatDisplayNumber(value) {
    return String(value);
  }

  buildExpression() {
    if (this.error) return this.completedExpression || 'Invalid operation';
    if (this.justCalculated && this.completedExpression) return this.completedExpression;
    if (this.firstOperand !== null && this.operator) {
      const left = this.formatDisplayNumber(this.firstOperand);
      const op = OPERATOR_LABELS[this.operator];
      return this.waitingForOperand ? `${left} ${op}` : `${left} ${op} ${this.currentInput}`;
    }
    return '\u00A0';
  }

  handleAction(action, value, eventName = 'click') {
    this.setLastInteraction(eventName, value ?? action);
    switch (action) {
      case 'number': this.inputNumber(value); break;
      case 'decimal': this.inputDecimal(); break;
      case 'operator': this.chooseOperator(value); break;
      case 'equals': this.performEquals(); break;
      case 'clear': this.reset(); break;
      case 'backspace': this.backspace(); break;
    }
  }
}
