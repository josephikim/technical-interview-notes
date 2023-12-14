// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.

// Given n, calculate F(n).

// Example 1:

// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

// Example 2:

// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

// Example 3:

// Input: n = 4
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

// Constraints:

// 0 <= n <= 30

/***********************************/

// Iterative solution (store results in hash or arr)
// More efficient than recursive solution without memoization (see Dynamic Programming)

// Time complexity = O(n)
// Space complexity = O(1) if we dont count result arr

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
	let f = [0, 1];
	if (n < 2) return f[n];

	for (i = 2; i <= n; i++) {
		f[i] = f[i - 1] + f[i - 2];
	}
	return f[n];
};

/***********************************/

// Recursive solution naive (involves duplicate calls for a given argument)

// Time complexity = O(2^n)
// Space complexity = O(1)

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
	if (n < 2) return n;
	return fib(n - 1) + fib(n - 2);
};
