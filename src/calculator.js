#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic math operations,
 * plus modulo, exponentiation, and square root:
 *   - add:      addition (a + b)
 *   - subtract: subtraction (a - b)
 *   - multiply: multiplication (a * b)
 *   - divide:   division (a / b), with division-by-zero handled gracefully
 *   - modulo:   remainder of a divided by b
 *   - power:    base raised to the exponent
 *   - sqrt:     square root of a single number, with error handling for negatives
 *
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
 *   node calculator.js sqrt <num1>
 *
 * Examples:
 *   node calculator.js add 5 3
 *   node calculator.js subtract 10 4
 *   node calculator.js multiply 6 7
 *   node calculator.js divide 20 4
 *   node calculator.js modulo 10 3
 *   node calculator.js power 2 10
 *   node calculator.js sqrt 16
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

// Modulo: returns the remainder of a divided by b
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a % b;
}

// Power: returns base raised to the exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Square root: returns the square root of n, throws on negative numbers
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Cannot compute the square root of a negative number.");
  }
  return Math.sqrt(n);
}

// Operations that take a single argument
const unaryOperations = new Set(["sqrt"]);

// Maps CLI operation names to their corresponding functions
const operations = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  sqrt: squareRoot,
};

function printUsage() {
  console.log("Usage: node calculator.js <operation> <num1> <num2>");
  console.log("       node calculator.js sqrt <num1>");
  console.log(
    "Operations: add, subtract, multiply, divide, modulo, power, sqrt"
  );
  console.log("Example: node calculator.js add 5 3");
  console.log("Example: node calculator.js sqrt 16");
}

function main() {
  const [, , operation, num1, num2] = process.argv;
  const isUnary = unaryOperations.has(operation);

  if (!operation || num1 === undefined || (!isUnary && num2 === undefined)) {
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
  const b = isUnary ? undefined : Number(num2);

  if (Number.isNaN(a) || (!isUnary && Number.isNaN(b))) {
    console.error("Error: Both arguments must be valid numbers.");
    process.exit(1);
  }

  try {
    const result = isUnary ? fn(a) : fn(a, b);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
};
