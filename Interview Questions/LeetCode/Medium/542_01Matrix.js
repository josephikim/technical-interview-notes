// Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

// The distance between two adjacent cells is 1.

// Example 1:

// Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
// Output: [[0,0,0],[0,1,0],[0,0,0]]
// Example 2:

// Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
// Output: [[0,0,0],[0,1,0],[1,2,1]]

// Constraints:

// m == mat.length
// n == mat[i].length
// 1 <= m, n <= 104
// 1 <= m * n <= 104
// mat[i][j] is either 0 or 1.
// There is at least one 0 in mat.

/***********************************/

// Iterative solution (using queue to update non-zero squares beginning from zero squares) DOES NOT USE RECURSION OR DFS

// Time complexity = O(N)
// Space complexity = O(N) for queue

// 1. init rows, cols, queue
// 2. loop mat elements, if value = 0, push cooridnates to queue, if value = 1, replace with -1
// 3. init directions in terms of dx, dy
// 4. loop through queue
// 5. foreach queue element, check if each 4-direction neighbor is valid
// 6. if neighbor is valid and its value = -1 (ie not updated), update the value to originating square's value + 1
// 7. push updated square's coordinates to queue
// 8. return updated matrix

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
	let rows = mat.length;
	let cols = mat[0].length;
	let queue = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (mat[i][j] === 0) {
				queue.push([i, j]);
			} else {
				mat[i][j] = -1;
			}
		}
	}

	// r, t, l, b in terms of (dx, dy)
	let directions = [
		[1, 0],
		[0, 1],
		[-1, 0],
		[0, -1],
	];
	for (const [r, c] of queue) {
		directions.forEach(([dx, dy]) => {
			if (0 <= r + dy && r + dy < rows && 0 <= c + dx && c + dx < cols) {
				if (mat[r + dy][c + dx] === -1) {
					mat[r + dy][c + dx] = mat[r][c] + 1;
					queue.push([r + dy, c + dx]);
				}
			}
		});
	}

	return mat;
};

// Recursive solution (naive - leads to TLE error)

// Time complexity = O()
// Space complexity =

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
	var distanceToZero = function (m, i, j) {
		if (m[i][j] === 0) return 0;

		let r = m[i]?.[j + 1];
		let b = m[i + 1]?.[j];
		let l = m[i]?.[j - 1];
		let t = m[i - 1]?.[j];

		if (r === 0 || b === 0 || l === 0 || t === 0) return 1;

		let candidates = [];

		if (r) {
			candidates.push(distanceToZero(m, i, j + 1) + 1);
		}
		if (b) {
			candidates.push(distanceToZero(m, i + 1, j) + 1);
		}
		if (l) {
			candidates.push(distanceToZero(m, i, j - 1) + 1);
		}
		if (t) {
			candidates.push(distanceToZero(m, i - 1, j) + 1);
		}

		return Math.min(...candidates);
	};

	for (let i = 0; i < mat.length; i++) {
		for (let j = 0; j < mat[i].length; j++) {
			if (mat[i][j] === 1) {
				mat[i][j] = distanceToZero(mat, i, j);
			}
		}
	}

	return mat;
};
