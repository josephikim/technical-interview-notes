// We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.

// For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
// Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.

// Example 1:

// Input: n = 1, k = 1
// Output: 0
// Explanation: row 1: 0
// Example 2:

// Input: n = 2, k = 1
// Output: 0
// Explanation:
// row 1: 0
// row 2: 01
// Example 3:

// Input: n = 2, k = 2
// Output: 1
// Explanation:
// row 1: 0
// row 2: 01

// Constraints:

// 1 <= n <= 30
// 1 <= k <= 2n - 1

/***********************************/

// Recursive solution (bitwise operations)

// Time complexity = O(n) (one recursion call for each row n)
// Space complexity = O(n) (max n recursion calls)

// NOTE: bitwise operations perform better than arithmetic ones

// Take advatage of fact that the values from k = 0...k/2 are the MIRROR IMAGE of values from k = k/2...k. IE
// 0
// 01
// 01 10
// 0110 1001
// 01101001 10010110

// find total number of values at current n via bitwise left shift (ie how many doublings occurred)
// find mid of total by using one bitwise right shift (one less doubling)
// use mid to return (n,k) values for (k <= mid)
// use mid to return !(n,k) values for (k > mid)

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function (n, k) {
	if (n == 1) return 0;
	// total represents number of iterations took to reach current n
	// ie how many times did doubling happen (2^n-1)
	const total = 1 << (n - 1);
	// mid represents one fewer doubling, ie gives midpoint of current k
	const mid = total >> 1;

	if (k <= mid) return kthGrammar(n - 1, k);
	else return !kthGrammar(n - 1, k - mid);
};

/***********************************/

// Same logic as above but different approach to finding mid

// /**
//  * @param {number} n
//  * @param {number} k
//  * @return {number}
//  */
// var kthGrammar = function(n, k) {
// 	if (n === 1) return 0;
// 	let mid = Math.pow(2, n - 2);
// 	if (k <= mid) return kthGrammar(n - 1, k);
// 	else return kthGrammar(n - 1, k - mid) === 0 ? 1 : 0;
// };

/***********************************/

// Recursive solution (naive)

// Time complexity = O(n) (one recursion call for each row n)
// Space complexity = O(n) (max n recursion calls)

// if k is odd, we return the corresponding root value from row (n-1) as is, otherwise return the opposite value
// set recurrence relation as kth(n, k) = kth(n - 1, Math.ceil(k / 2));
// if k is odd, return recurrence result
// if k is even, return opposite of recurrence result

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function (n, k) {
	if (n === 1) return 0;

	// k is odd
	if (k % 2 === 1) {
		return kthGrammar(n - 1, Math.ceil(k / 2));
	} else {
		// k is even
		return !kthGrammar(n - 1, Math.ceil(k / 2));
	}
};

/***********************************/

// Iterative solution (naive - results in heap out of memory)

// Time complexity = O(2n^2)
// Space complexity = O(2^n)

// check for base condition if n==1 return 0
// check for base condition if k==1 return 0
// set last row as [0] (ie n =1)
// update last row for each n using for loop
// update new row by looping through each number in last row and pushing (0, 1) or (1, 0)
// return lastRow[k-1]

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function (n, k) {
	if (n === 1) return 0;
	if (k === 1) return 0;

	let lastRow = [0];
	for (let i = 2; i <= n; i++) {
		let newRow = [];
		for (let j = 0; j < lastRow.length; j++) {
			if (lastRow[j] === 0) {
				newRow.push(0, 1);
			} else {
				newRow.push(1, 0);
			}
		}
		lastRow = newRow;
	}
	return lastRow[k - 1];
};
