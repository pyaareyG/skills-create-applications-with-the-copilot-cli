#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic math operations:
 *   - add:      addition (a + b)
 *   - subtract: subtraction (a - b)
 *   - multiply: multiplication (a * b)
 *   - divide:   division (a / b), with division-by-zero handled gracefully
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
 *
 * Examples:
 *   node calculator.js add 5 3
 *   node calculator.js subtract 10 4
 *   node calculator.js multiply 6 7
 *   node calculator.js divide 20 4
 */

// Addition: returns the sum of two numbers
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of two numbers
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of two numbers
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of two numbers, throws on division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

// Maps CLI operation names to their corresponding functions
const operations = {
  add,
  subtract,
  multiply,
  divide,
};

function printUsage() {
  console.log("Usage: node calculator.js <operation> <num1> <num2>");
  console.log("Operations: add, subtract, multiply, divide");
  console.log("Example: node calculator.js add 5 3");
}

function main() {
  const [, , operation, num1, num2] = process.argv;

  if (!operation || num1 === undefined || num2 === undefined) {
    printUsage();
    process.exit(1);
  }

  const fn = operations[operation];
  if (!fn) {
    console.error(`Error: Unknown operation "${operation}".`);
    printUsage();
    process.exit(1);
  }

  const a = Number(num1);
  const b = Number(num2);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error("Error: Both arguments must be valid numbers.");
    process.exit(1);
  }

  try {
    const result = fn(a, b);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide };
