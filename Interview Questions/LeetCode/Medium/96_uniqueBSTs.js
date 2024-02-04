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

/*
1. Go through the simplest cases first ie numTrees(1), numTrees(2) etc.
2. [[1, 1], [2, 2], [3, 5]] => This might look like fibonacci but NOT EXACTLY
3. What we really want is the possible number of left and right subtrees SUMMED UP FOR ALL CASES 1...N WITH N AS THE ROOT NODE

4. EG for n = 4:

numTrees(4) = numTreesWithRoot1 (numTrees(0) + numTrees(3)) + numTreesWithRoot2 (numTrees(1) + numTrees(2)) + numTreesWithRoot3 (numTrees(2) + numTrees(1)) + numTreesWithRoot4 (numTrees(3) + numTrees(0))

5. So we want to know numTrees for any given input i from 0...n-1. We will track this with a DP array. 
6. We know the first two cases:  

dp(0) = 1 // Empty subtree case
dp(1) = 1 // Single node subtree case 

7. We fill in the rest (dp(2)...dp(n)) to calculate the final answer
*/

/***********************************/

// Iterative solution (with dynamic programming array)

// Time complexity = O(n)
// Space complexity = O(n)

// use array for dp
var numTrees = function (n) {
	let dp = [1, 1];

	for (let i = 2; i <= n; i++) {
		let total = 0;
		for (let root = 1; root <= i; root++) {
			let left = root - 1;
			let right = i - root;
			total += dp[left] * dp[right];
		}
		dp.push(total);
	}

	return dp[n];
};

/***********************************/

// Recursive solution (with dynamic programming object)

// Time complexity = O(logN)
// Space complexity = O(N)

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
	let dp = {}; // tracks key:value pairs for keys from 2...n-1

	const getCount = (n) => {
		if (dp[n] !== undefined) return dp[n];
		if (n <= 1) return 1; // handles first two cases (empty node and single node subtrees)

		let count = 0;

		// i = possible positions of root node in n
		for (let i = 1; i <= n; i++) {
			count += getCount(i - 1) * getCount(n - i);
		}

		return (dp[n] = count);
	};
	return getCount(n);
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
