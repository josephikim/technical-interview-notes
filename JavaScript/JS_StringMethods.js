/* 20 String methods */

var stringOne = "freeCodeCamp is the best place to learn";
var stringTwo = "frontend and backend development";

//charAt()
console.log(stringOne.charAt(1));

// charCodeAt()
console.log(stringOne.charCodeAt(1));

// concat()
console.log(stringOne.concat(stringTwo));

// endsWith()
console.log(stringOne.endsWith("to"));

// fromCharCode()
console.log(String.fromCharCode(114));

// inclues()
console.log(stringTwo.includes("end"));

// indexOf()
console.log(stringTwo.indexOf("end"));

// lasIndexOf()
console.log(stringTwo.lastIndexOf("end"));

// match()
// 'g' is flag meaning global => will return all cases (in an array) instead of just first case
// 'i' is flag meaning ignore case
console.log(stringTwo.match(/end/g));

// repeat()
console.log(stringOne.repeat(3));

// replace()
console.log(stringTwo.replace(/end/g, "END"));

// search()
console.log(stringTwo.search("end"));

// slice()
console.log(stringTwo.slice(2, 4));

// split()
console.log(stringTwo.split(" "));

// startWith()
console.log(stringOne.startsWith("free"));

// substr()
console.log(stringTwo.substr(2, 4));

// substring()
console.log(stringTwo.substring(2, 4));

// toLowerCase()
console.log(stringTwo.toLowerCase());

// toUpperCase()
console.log(stringTwo.toUpperCase());

// trim()
const stringThree = "     Subscribe!";
console.log(stringThree.trim());
