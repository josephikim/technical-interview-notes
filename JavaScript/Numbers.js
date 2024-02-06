// Number Object
// created by x = new Number(5)
// Number Object contains useful inbuilt properties and methods

/*
  Method                       Description
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  toExponential(x)    Converts a number into an exponential notation
  toFixed(x)          Formats a number with x numbers of digits after the decimal point
  toPrecision(x)      Formats a number to x length
  toString()          Converts a Number object to a string
  valueOf()           Returns the primitive value of a Number object

  Property                        Description
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  constructor         Returns the function that created the Number object's prototype
  MAX_VALUE       Returns the largest number possible in JavaScript
  MIN_VALUE           Returns the smallest number possible in JavaScript
  NEGATIVE_INFINITY   Represents negative infinity (returned on overflow)
  NaN             Represents a "Not-a-Number" value
  POSITIVE_INFINITY   Represents infinity (returned on overflow)
  prototype           Allows you to add properties and methods to an object
  */

// Regular 'Number'
// Number is a primitive type in JS

// IN PRACTICE
// References behave differently for Number Objects vs Number Primitives
foo = new Number(5);
bar = new Number(5);
console.log(foo === bar); // false
foo = 5;
bar = 5;
console.log(foo === bar); // true

// BUT all available methods for number objects is also available for primitive numbers
// When you invoke a method on a primitive number, the number temporarily gets converted to a Number object and then the method executes

var temp1 = Object(1); // number object
var temp2 = 1; // primitive number

console.log(temp1.toString()); // invoke its own method. result: 1
console.log(temp2.toString()); // temporarily converts to object and invoke number object method. result:1

console.log(Object(1).constructor === Number); //true≠
console.log((1).constructor === Number); //true
//             ^---------- temporarily converts to object

// Common Functions using Numbers

// Random Number Generation

// This returns an integer from 0 to 'max', bc Math.floor() cuts off the decimal portion of the number produced by multiplying max by the floating number returned by Math.random();
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

console.log(getRandomInt(3));
// expected output: 0, 1 or 2

console.log(getRandomInt(1));
// expected output: 0

console.log(Math.random());
// expected output: a number from 0 to <1
