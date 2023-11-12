// Given an integer n, return the number of structurally unique BST's (binary search trees) which has exactly n nodes of unique values from 1 to n.

// Example 1:

// Input: n = 3
// Output: 5

// Example 2:

// Input: n = 1
// Output: 1

// Constraints:

// 1 <= n <= 19

/***********************************/

// Iterative solution (optimal with dynamic programming)

// Time complexity = O(logN)
// Space complexity = O(N)

// use array for dp
var numTrees = function (n) {
	let dp = [1, 1],
		sum = 0;
	for (let i = 2; i <= n; i++) {
		for (let j = 1; j <= i; j++) {
			// j = the number of left subtree node
			let right = i - j; // num of right nodes
			let left = i - right - 1; // num of left nodes
			sum = dp[right] * dp[left] + sum;
		}
		dp.push(sum);
		sum = 0;
	}
	return dp[n];
};

// Can be written even simpler

// var numTrees = function (n) {
// 	let dp = Array(n + 1).fill(0);

// 	dp[0] = 1;
// 	dp[1] = 1;

// 	for (let i = 2; i <= n; i++) {
// 		for (let j = 1; j <= i; j++) {
// 			dp[i] += dp[j - 1] * dp[i - j];
// 		}
// 	}

// 	return dp[n];
// };

/***********************************/

// Recursive solution (with dynamic programming)

// Time complexity = O(logN)
// Space complexity = O(N)

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
	let uniques = { 0: 1, 1: 1, 2: 2 };
	if (!!uniques[n]) return uniques[n];
	let total = 0;
	// recursively add uniques for all subtree combinations
	// add to hash for dynamic programming
	for (let i = 0; i <= n - 1; i++) {
		let l, r;
		// multiply uniques on left subtree and right subtree
		if (!!uniques[i]) {
			l = uniques[i];
		} else {
			l = numTrees(i);
			uniques[i] = l;
		}
		if (!!uniques[n - 1 - i]) {
			r = uniques[n - 1 - i];
		} else {
			r = numTrees(n - 1 - i);
			uniques[n - 1 - i] = r;
		}
		total += l * r;
	}
	return total;
};

/***********************************/

// Recursive solution (naive - stack overflow may occur with large n)

// Time complexity = O(2^n) = same as fibonacci bc we're calling two recursions for each loop in n
// Space complexity = O(1)

// uniques at a given node = sum of uniques of possible subtrees

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
	if (n === 0) return 1;
	if (n === 1 || n === 2) return n;
	if (n === 3) return 5;
	let uniques = 0;
	// recursively add uniques for all subtree combinations
	for (let i = 0; i <= n - 1; i++) {
		// multiply uniques on left subtree and right subtree
		uniques += numTrees(i) * numTrees(n - 1 - i);
	}
	return uniques;
};
