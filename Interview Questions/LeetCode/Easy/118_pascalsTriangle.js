// NOTE: Pascals' triangle contains values related to the binomial theorem ie the coefficients of polynomial expansion
// e.g. (x + y)^3 = x^3 + 3x^2y + 3xy^2 + y^3

/***********************************/

// Given an integer numRows, return the first numRows of Pascal's triangle.

// In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

// Example 1:

// Input: numRows = 5
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
// Example 2:

// Input: numRows = 1
// Output: [[1]]

// Constraints:

// 1 <= numRows <= 30

// Follow up: Could you optimize your algorithm to use only O(rowIndex) extra space?

/**********************************

O(n^2) - Iterative with DP

1. Init result array 'rows'
2. Create recursive function that generates a single row that calculates values from last row in dp
3. Loop through each row index, call recursive function, update DP

O(n^2 * 2^n/sqrt(n)) - Generate cells recursively without DP

1. Create recursive function to generate cell with recursion relation: recurrence relation: f(i, j) = f(i−1, j−1) + f(i−1, j)
2. Use two nested loops (rows & cols) to generate each row of elements one by one

***********************************/

// Iterative solution with DP

// Time commplexity = O(nRows * nCols (= nRows)) => O(n^2) worst case
// 		Triangle has 1 + 2 + ... + n elements. This is arithmetic progression that sums to n*(n+1)/2, which is in O(n^2)
// Space complexity = O(1) depending if u count aux space
// Aux space = O(n)

// 1. Init DP array 'rows'
// 2. Create recursive function that generates a single row that calculates values from last row in dp
// 3. Loop through each row index, call recursive function, update DP

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
	let rows = [];

	var generateRow = function (rowIndex) {
		let row = [];
		// rowIndex = 0-based row
		// j = 0-based column
		for (let j = 0; j < rowIndex + 1; j++) {
			if (j === 0 || j === rowIndex) {
				row.push(1);
			} else {
				row.push(rows[rowIndex - 1][j - 1] + rows[rowIndex - 1][j]);
			}
		}
		return row;
	};

	for (i = 0; i < numRows; i++) {
		rows.push(generateRow(i));
	}
	return rows;
};

/***********************************/

// Iterative solution 2

// Same idea as above, but different readability

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
	const res = [];
	let arr = [1];
	for (let i = 0; i < numRows; i++) {
		if (i === 0) res.push([1]);
		else if (i === 1) res.push([1, 1]);
		else {
			for (let i = 0; i + 1 < res.at(-1).length; i++) {
				arr.push(res.at(-1)[i] + res.at(-1)[i + 1]);
			}
			arr.push(1);
			res.push(arr);
			arr = [1];
		}
	}
	return res;
};

/***********************************/

// Recursive solution 2 (LESS EFFICIENT)

// Time complexity = O(n^2 * 2^n/sqrt(n)) => 2 nested loops (arthmetic summation) times recursion at each cell (ie O(2^n/sqrt(n))

// Auxiliary space = O(n) for temp array 'row'
// Space complexity = O(n) for max depth of recursion calls

// 2 nested loops (rows & cols) with recursive function that generates a single cell of triangle

// recurrence relation: f(i, j) = f(i−1, j−1) + f(i−1, j)
// 		ie  f(2, 1) = f(1, 0) + f(1, 1)
// base case: f(i, j) = 1 where j = 1 or j = i

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generatePascal = function (numRows) {
	let result = [];

	// time complexity of one call to recursive function = O(2^n/sqrt(n))
	var generateCell = function (row, col) {
		if (row === 0 || col === 0 || row === col) return 1;
		return generateCell(row - 1, col - 1) + generateCell(row - 1, col);
	};

	for (i = 0; i < numRows; i++) {
		let row = [];
		for (j = 0; j < i + 1; j++) {
			let cell = generateCell(i, j);
			row.push(cell);
		}
		result.push(row);
	}
	return result;
};
