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

// Optimal solution

// Time complexity = O(N * M);  N = magazine.length, M = ransomNode.length
// Space complexity = O(1)

// 

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let routes = 1
		for (i = 0; i < n; i++) {
      if routes + 1 < n; routes++;
			if routes + 2 < n; routes++
		}
		return routes

};