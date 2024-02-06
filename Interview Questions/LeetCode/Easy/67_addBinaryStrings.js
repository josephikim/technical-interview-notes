// Given two binary strings a and b, return their sum as a binary string.

// Example 1:

// Input: a = "11", b = "1"
// Output: "100"
// Example 2:

// Input: a = "1010", b = "1011"
// Output: "10101"

// Constraints:

// 1 <= a.length, b.length <= 104
// a and b consist only of '0' or '1' characters.
// Each string does not contain leading zeros except for the zero itself.

// NOTE: Cannot convert the input strings into decimals, add them, and convert the number into a string, as it exceeds memory allotted for a 64-bit integer.

/**********************************

O(n) - Convert to BigInts ("Cheating" shortcut)

1. convert binary strings to JS binary literal syntax
2. convert to BigInts and sum the two values
3. return sum as binary string using BigInt.prototype.toString() with radix 2

O(n) - Manually implement bitwise functions
This will still be constance space complexity (O(1)) but more than BigInt solution

1. Manually build out bitwise operations (logic gates), halfAdder, fullAdder, and padZeroes
2. Do bitwise arthmetic on binary strings with padded zeroes

O(n) - Manually implement bitwise adding
This will still be constance space complexity (O(1)) but more than BigInt solution

1. Manually build out bitwise operations (logic gates), halfAdder, fullAdder, and padZeroes
2. Do bitwise arthmetic on binary strings with padded zeroes

Note: The last O(n) solution below is essentially the same as bitwise adding solution but with unnecessary calls to Array.reverse()

**********************************/

// Iterative solution (optimal using bigint)

// Time complexity = O(n)
// Space complexity = O(1)

// convert string to JS binary number syntax
// convert to BigInts and sum
// return sum as binary string using BigInt.prototype.toString() with radix 2

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
	const aBin = `0b${a}`;
	const bBin = `0b${b}`;
	const sum = BigInt(aBin) + BigInt(bBin);
	return sum.toString(2);
};

/***********************************/

// Iterative solution (manually build out bitwise operations (logic gates), halfAdder, fullAdder, and padZeroes)

// Time complexity = O(n)
// Space complexity = O(1)

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
	let sum = "";
	let carry = "";

	const paddedInput = padZeroes(a, b);
	a = paddedInput[0];
	b = paddedInput[1];

	for (let i = a.length - 1; i >= 0; i--) {
		if (i == a.length - 1) {
			// half add the first pair
			const halfAdd1 = halfAdder(a[i], b[i]);
			sum = halfAdd1[0] + sum;
			carry = halfAdd1[1];
		} else {
			// full add the rest
			const fullAdd = fullAdder(a[i], b[i], carry);
			sum = fullAdd[0] + sum;
			carry = fullAdd[1];
		}
	}
	return carry ? carry + sum : sum;
};

// logic gates
function xor(a, b) {
	return a === b ? 0 : 1;
}

function and(a, b) {
	return a == 1 && b == 1 ? 1 : 0;
}

function or(a, b) {
	return a || b;
}

function halfAdder(a, b) {
	const sum = xor(a, b);
	const carry = and(a, b);
	return [sum, carry];
}

function fullAdder(a, b, carry) {
	halfAdd = halfAdder(a, b);
	const sum = xor(carry, halfAdd[0]);
	carry = and(carry, halfAdd[0]);
	carry = or(carry, halfAdd[1]);
	return [sum, carry];
}

function padZeroes(a, b) {
	const lengthDifference = a.length - b.length;
	switch (lengthDifference) {
		case 0:
			break;
		default:
			const zeroes = Array.from(Array(Math.abs(lengthDifference)), () =>
				String(0)
			);
			if (lengthDifference > 0) {
				// if a is longer than b
				// then we pad b with zeroes
				b = `${zeroes.join("")}${b}`;
			} else {
				// if b is longer than a
				// then we pad a with zeroes
				a = `${zeroes.join("")}${a}`;
			}
	}
	return [a, b];
}

/***********************************/

// Iterative solution (naive)

// Time complexity = O(n) + O(n) for Array.reverse => O(n)
// Space complexity = O(1)

var addBinary = function (a, b) {
	let firstBinary = a.split("").map(Number).reverse();
	let secondBinary = b.split("").map(Number).reverse();

	let lengthOfArr = Math.max(firstBinary.length, secondBinary.length);
	let carry = 0;
	let result = [];

	for (let i = 0; i < lengthOfArr; i++) {
		let firstNum = firstBinary[i] || 0;
		let secondNum = secondBinary[i] || 0;

		let sum = firstNum + secondNum + carry;

		result.push(sum % 2);
		carry = sum >= 2 ? 1 : 0;
	}
	if (carry === 1) result.push(1);

	return result.reverse().join("");
};
