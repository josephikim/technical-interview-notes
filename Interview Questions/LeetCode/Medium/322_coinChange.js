// You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

// Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

// You may assume that you have an infinite number of each kind of coin.

// Example 1:

// Input: coins = [1,2,5], amount = 11
// Output: 3
// Explanation: 11 = 5 + 5 + 1

// Example 2:

// Input: coins = [2], amount = 3
// Output: -1

// Example 3:

// Input: coins = [1], amount = 0
// Output: 0

// Constraints:

// 1 <= coins.length <= 12
// 1 <= coins[i] <= 2^31 - 1
// 0 <= amount <= 10^4

/***********************************/

/*

Example:
let coins = [1, 3, 4, 5], let amount = 7

1. Can we do greedy algo? (check 5+4, then 5+3, then 5+1, then 5+1+1)
	- NO, this gives us inefficient solution ie 5+1+1 = 3 coins instead of true answer of 2

2. Can we do DFS - Top Down solution?
	- YES, but no guarantee that we'll arrive at optimal soution first
	- IE modeled as a n-ary tree with root node value of 7
	- We have to check every branch (each path representing possible difference) eg. 7 -> 6, 7 -> 4, 7-> 3, 7 -> 2. This does NOT guarantee efficient solution

3. Can we use true DP - Bottom Up solution? 
	- YES, this is most efficient
	- DP array values represent num coins needed to reach a sum n such that dp[n] = num coins to reach sum n
	- we know the base case: dp[0] = 0 coins needed

/***********************************/

// Iterative solution

// Time complexity = O(n*m) => n amount, m number of coins
// Space complexity = O(n) for dp

// NOTE: this isn't 100% efficient because we still loop every coin value to confirm the overall best solution

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
	// sort coins
	coins.sort((a, b) => a - b);
	// init dp as array of length "amount + 1" with values as "amount + 1" (this indicates default value which means not solvable for a given amount n)
	let dp = Array(amount + 1).fill(amount + 1);
	// set base case (amount = 0)
	dp[0] = 0;

	// fill dp for each integer sum up to amount
	for (let i = 1; i <= amount; i++) {
		// check dp for remaining sum after subtracting each coin value
		for (let coin of coins) {
			if (i - coin >= 0) {
				dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
			}
		}
	}
	// if dp returns default value ie "amount + 1", solution was not possible
	return dp[amount] !== amount + 1 ? dp[amount] : -1;
};
