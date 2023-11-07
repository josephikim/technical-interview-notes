// Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

// Example 1:

// Input: rowIndex = 3
// Output: [1,3,3,1]
// Example 2:

// Input: rowIndex = 0
// Output: [1]
// Example 3:

// Input: rowIndex = 1
// Output: [1,1]

// Constraints:

// 0 <= rowIndex <= 33

// Follow up: Could you optimize your algorithm to use only O(rowIndex) extra space?

/***********************************/

// Iterative solution

// Time commplexity = O(n^2)
// Auxiliary space = O(n) for nextRow arr
// Space complexity = O(n)

// set result to [1] (case of n = 0)
// loop through each n and calculate the next row from the perspective of 'parents' from prev row
// result gets updated as next row on each loop

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
	let result = [1];

	for (i = 0; i < rowIndex; i++) {
		let nextRow = new Array(result.length + 1).fill(0);
		for (j = 0; j < result.length; j++) {
			nextRow[j] += result[j];
			nextRow[j + 1] += result[j];
		}
		result = nextRow;
	}
	return result;
};

/***********************************/

// Recursive solution (NOT OPTIMAL => Stack overflow with large N)

// Time commplexity = O(n^2)
// Auxiliary space = O(1) ie no structures needed to do calcs
// Space complexity = O(1) but DEPENDS. Typically the answer array is not counted towards the space complexity if you are required to return a separate answer array. So if you are using just one answer array then the space complexity will be O(1) but if you are using two arrays then the space complexity will be O(N).

// create recursive function that generates a single cell by getting results of the parent cells above it in the triangle

// recurrence relation: f(i, j) = f(i−1, j−1) + f(i−1, j)
// 		ie  f(2, 1) = f(1, 0) + f(1, 1)
// base case: f(i, j) = 1 where j = 1 or j = i

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
	let row = [];

	// recursive function
	var generateCell = function (row, col) {
		if (row === 0 || col === 0 || row === col) return 1;
		return generateCell(row - 1, col - 1) + generateCell(row - 1, col);
	};

	for (j = 0; j <= rowIndex; j++) {
		row.push(generateCell(rowIndex, j));
	}
	return row;
};
