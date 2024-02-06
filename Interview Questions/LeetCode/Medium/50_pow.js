// Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

// Example 1:

// Input: x = 2.00000, n = 10
// Output: 1024.00000
// Example 2:

// Input: x = 2.10000, n = 3
// Output: 9.26100
// Example 3:

// Input: x = 2.00000, n = -2
// Output: 0.25000
// Explanation: 2-2 = 1/22 = 1/4 = 0.25

// Constraints:

// -100.0 < x < 100.0
// -231 <= n <= 231-1
// n is an integer.
// Either x is not zero or n > 0.
// -104 <= xn <= 104

/***********************************/

// JS solution (recursive)

// Time complexity = O(log N) because pow(x,n/2) is calculated and then stored for again using the same result.
// Space complexity = O(1)

// check for base condition if n==1 return 1
// check if n is even
// call myPow(x, n/2) * myPow(x, n/2)
// if n is odd
// call myPow(x, n/2) * myPow(x, n/2)

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
	//base condition
	if (n == 0) return 1;
	if (n == 1) return x;
	if (n == -1) return 1 / x;

	let result = myPow(x, Math.floor(n / 2));

	// if power is even
	if (n % 2 == 0) {
		return result * result;
	} else {
		return x * result * result;
	}
};

/***********************************/

// JS solution (naive recursive, can reach stack overflow)

// Time complexity = O(N) bc there are N recursive calls
// Space complexity = O(1)

// check base condition if n==0 return 1
// check base condition if n==1 return x
// recursively call myPow(x,n-1)
// print result

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
	//base condition
	if (n == 0) return 1;
	if (n == 1) return x;
	if (n < 0) {
		n++;
		return 1 / (x * myPow(x, Math.abs(n)));
	} else {
		n--;
		return x * myPow(x, n);
	}
};

/***********************************/

// JS solution (naive with built-in function)

// Time complexity = O(1)
// Space complexity = O(1)

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
	return x ** n;

	// OR EQUIVALENT LOGIC
	// if (x === 0) return x;
	// if (n < 0) {
	// 	return 1 / Math.pow(x, Math.abs(n));
	// }
	// return Math.pow(x, n);
};

/***********************************/

// JS solution (naive)

// Time complexity = O(n) (has to recalculate for each n)
// Space complexity = O(1)

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
	if (x === 0) return x;

	let result = 1;

	if (n < 0) {
		for (let i = 1; i <= Math.abs(n); i++) {
			result = result * (1 / x);
		}
	} else {
		for (let i = 1; i <= n; i++) {
			result = result * x;
		}
	}

	return result;
};
