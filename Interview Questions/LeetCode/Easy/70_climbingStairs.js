// You are climbing a staircase. It takes n steps to reach the top.

// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:

// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:

// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Constraints:

// 1 <= n <= 45

/***********************************/

// Iterative solution (least memory)

// Time complexity = O(n)
// Space complexity = O(1)

// for a given n, Routes(n) = Routes(n-1) + Routes(n-2)
// 'prev1' = Routes(n - 2) ie routes that led to target minus 2
// 'prev2 = Routes(n - 1) ie routes that lead to target minus 1
// on each loop, update 'prev1' and 'prev2' using a temp variable(follows fibonnaci sequence)
// return final 'prev2'

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
	if (n <= 2) return n;
	let prev1 = 1;
	let prev2 = 2;
	for (i = 3; i <= n; i++) {
		let temp = prev2;
		prev2 = prev1 + prev2;
		prev1 = temp;
	}
	return prev2;
};

/***********************************/

// Iterative solution 2 (dynamic programming, but more memory)

// Time complexity = O(n)
// Space complexity = O(n)

// same logic as above, but storing entire result set

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
	let dp = new Array(n + 1).fill(0);
	dp[0] = 1;
	dp[1] = 1;
	for (i = 2; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}
	return dp[n];
};

/***********************************/

// Recursive solution naive (involves duplicate calls for a given argument, can lead to stack overlow)

// Time complexity = O(2^n)
// Space complexity = O(1)

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
	if (n < 1) {
		return -1;
	} else if (n === 1) {
		return 1;
	} else if (n === 2) {
		return 2;
	} else {
		return climbStairs(n - 1) + climbStairs(n - 2);
	}
};
