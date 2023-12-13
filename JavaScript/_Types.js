//// Primitive Types

// Undefined
// Null
// Boolean
// String
// Symbol
// Number
// BigInt

//// Non-Primitive Types (Reference types)

// Object
// Array
// Function
// NOTE: Arrays and functions are subtypes of the object type

//// STORAGE

// Primitive values are stored by value and immutable after creation

let man = "ifeoma";
// Here it simply made a copy and then altered the copied value.
console.log(man.toUpperCase()); // IFEOMA
// It didn't change the original value.
console.log(man); //  ifeoma

// However you can make change copies of primitives however you like
let foo = "bar";
foo = foo.toUpperCase();
console.log(foo); // 'BAR'

// Non-primitives are stored by reference and are mutable

let array = ["Jay Pritchet", "Phil Dunphy"];
let array2 = array;

array.push("Claire Pritchet");
console.log(array2); // [ "Jay Pritchet", "Phil Dunphy", "Claire Pritchet" ]

const obj = { name: "John", age: 24 };
console.log(obj); // {name: 'John', age: 24}

obj.name = "Jane";
console.log(obj); // {name: 'Jane', age: 24}

//// PASS BY VALUE VS PASS BY REFERENCE

// Args that are primitives are passed by value (ie a copy of the value)

const age = 24;

function incrementAge(age) {
  age += 1;
  return age;
}

console.log(age); // 24

incrementAge(age);

console.log(age); // 24

// Args that are objects are passed by reference (ie reference to original object) AVOID THIS IF POSSIBLE

const person = { name: "John", age: 24 };

function incrementAge(person) {
  person.age += 1;
  return person;
}

console.log(person.age); // 24

incrementAge(person);

console.log(person.age); // 25

//// COMPARE BY VALUE VS COMPARE BY REFERENCE

// Primitives are compared by value

const color1 = "blue";
const color2 = "blue";

console.log(color1 === color2); // true

// Objects are compared by reference
// An object will always equal itself, but two objects with same properties (even a deep or shallow copy of the object) won't be equal

const obj1 = { color: "blue" };
const obj2 = { color: "blue" };
const obj3 = { ...obj1 };

console.log(obj1 === obj2); // false
console.log(obj3 === obj1); // false

//// COPY BY VALUE VS COPY BY REFERENCE

// Primitives are copied by value

let c1 = "blue";
let c2 = c1;

c1 = "pink";

console.log(c2); // 'blue'
console.log(c1); // 'pink'

// Objects are copied by reference (AVOID IF POSSIBLE)
const ob1 = { color: "blue" };
const ob2 = ob1;

ob1.color = "pink";
ob2.color = "green";

console.log(ob1); // {color: 'green'}
console.log(ob2); // {color: 'green'}

console.log(ob1 === ob2); // true

//// CHECKING TYPES

// The typeOf operator always returns a string type.
/*
  typeof 'you are awesome!' // 'string'
  typeof 42                 // 'number'
  typeof true               // 'boolean'
  typeof undefined          // 'undefined'
  typeof {name: 'aman'}.    // 'object'
  typeof Symbol()           // 'symbol'

  ------------------------
  typeof function foo(){}.  // 'function'
  typeof []                 // 'object'
  */

//// COERCING TYPES

// Coercion refers to the process of converting values from one type to another(such as string to number ).
// Coercion always results in either strings , numbers , or booleans

//// EXPLICIT COERCION

// Use inbuilt functions(Number(), String() etc.)

//// IMPLICIT COERCION

5 - "1"; // 4  JavaScript coerced the string 1 to a number.
10 * false; // 0  Javascript coerced the boolean false to 0.
10 + true; // 11  The boolean true is coerced to a number 1.

//// ABSTRACT OPERATIONS

// Abstract Operations are the fundamental building block that makes up how we deal with type conversion. - Kyle Simpson
// Abstract Operations are not part of JS language, but are responsible for performing type conversion

// ToString()
// ToNumber()
// ToPrimitive()
// ToBoolean()
