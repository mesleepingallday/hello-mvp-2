import assert from 'node:assert/strict';
import { CalculatorModel } from '../js/calculator.js';

function run(sequence) {
  const m = new CalculatorModel();
  for (const [action, value] of sequence) m.handleAction(action, value, 'test');
  return m;
}

let m = run([['number','2'],['operator','+'],['number','3'],['equals','=']]);
assert.equal(m.currentInput, '5');

m = run([['number','9'],['operator','-'],['number','4'],['equals','=']]);
assert.equal(m.currentInput, '5');

m = run([['number','6'],['operator','*'],['number','7'],['equals','=']]);
assert.equal(m.currentInput, '42');

m = run([['number','2'],['number','0'],['operator','/'],['number','5'],['equals','=']]);
assert.equal(m.currentInput, '4');

m = run([['number','1'],['decimal','.'],['number','5'],['operator','+'],['number','2'],['equals','=']]);
assert.equal(m.currentInput, '3.5');

m = run([['number','1'],['number','0'],['operator','/'],['number','0'],['equals','=']]);
assert.equal(m.currentInput, 'Error');
assert.equal(m.error, true);

m = run([['number','1'],['decimal','.'],['number','2'],['decimal','.'],['number','3']]);
assert.equal(m.currentInput, '1.23');

m = run([['number','1'],['number','2'],['number','3'],['backspace','⌫']]);
assert.equal(m.currentInput, '12');

m = run([['number','1'],['number','2'],['operator','+'],['operator','-'],['number','5'],['equals','=']]);
assert.equal(m.currentInput, '7');

m = run([['number','5'],['operator','+'],['number','3'],['equals','='],['number','2']]);
assert.equal(m.currentInput, '2');

m = run([['number','8'],['operator','*'],['number','9'],['equals','=']]);
assert.equal(m.currentInput, '72');

m.handleAction('clear', 'C', 'test');
assert.equal(m.currentInput, '0');
assert.equal(m.firstOperand, null);
assert.equal(m.operator, null);

console.log('PASS: 12 calculator model tests');
