'use strict';

import { CalculatorModel } from './calculator.js';

const model = new CalculatorModel();

const dom = {
  keypad: document.querySelector('#keypad'),
  display: document.querySelector('#display'),
  expression: document.querySelector('#expression'),
  statusBadge: document.querySelector('#status-badge'),
  event: document.querySelector('#state-event'),
  value: document.querySelector('#state-value'),
  currentInput: document.querySelector('#state-current-input'),
  firstOperand: document.querySelector('#state-first-operand'),
  operator: document.querySelector('#state-operator'),
  waiting: document.querySelector('#state-waiting')
};

function render() {
  dom.display.textContent = model.currentInput;
  dom.expression.textContent = model.buildExpression();
  dom.display.classList.toggle('is-error', model.error);
  dom.statusBadge.textContent = model.error ? 'Error' : 'Ready';
  dom.statusBadge.classList.toggle('error', model.error);

  document.querySelectorAll('[data-action="operator"]').forEach((button) => {
    button.classList.toggle('is-selected', !model.error && model.operator === button.dataset.value);
  });

  dom.event.textContent = model.lastEvent;
  dom.value.textContent = String(model.lastValue);
  dom.currentInput.textContent = JSON.stringify(model.currentInput);
  dom.firstOperand.textContent = model.firstOperand === null ? 'null' : String(model.firstOperand);
  dom.operator.textContent = model.operator === null ? 'null' : JSON.stringify(model.operator);
  dom.waiting.textContent = String(model.waitingForOperand);
}

function handleAction(action, value, eventName = 'click') {
  model.handleAction(action, value, eventName);
  render();
}

dom.keypad.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  handleAction(button.dataset.action, button.dataset.value, 'click');
});

window.addEventListener('keydown', (event) => {
  if (/^[0-9]$/.test(event.key)) {
    handleAction('number', event.key, 'keydown');
  } else if (event.key === '.') {
    handleAction('decimal', '.', 'keydown');
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    handleAction('operator', event.key, 'keydown');
  } else if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    handleAction('equals', '=', 'keydown');
  } else if (event.key === 'Backspace') {
    event.preventDefault();
    handleAction('backspace', '⌫', 'keydown');
  } else if (event.key === 'Escape') {
    handleAction('clear', 'C', 'keydown');
  }
});

render();
