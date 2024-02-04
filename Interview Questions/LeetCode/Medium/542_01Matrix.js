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

// Iterative solution (BFS)

// We will udpate the input matrix, replacing all squares' values with the distance to the nearest 0 value square
// Initialize a BFS queue with all "0" squares
// For each square in the queue, we check for any non-zero neighbors, add +1 to their value, and add the updated square to the queue.
// Iterate until the queue is empty

// Time complexity = O(n*m) + O(n*m) => O(n*m)
// Space complexity = O(n*m) for queue

// 1. init rows, cols
// 2. init BFS queue by looping entire matrix => if value = 0, push coordinates to queue, if value = 1, replace with -1 (represents "unchecked")
// 3. init 4-directions in terms of dx, dy
// 4. loop through BFS queue
// 5. for each unchecked element (value == -1), check if each 4-direction neighbor exists
// 6. if neighbor exists and is unchecked, update the value to origin square's value + 1
// 7. push updated square's coordinates to queue
// 8. iterate queue until it's empty, then return updated matrix

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
	let rows = mat.length;
	let cols = mat[0].length;
	let queue = [];
	// Initialize queue
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

	// Process queue elements
	for (const [r, c] of queue) {
		// if neighbor square is valid and is unchecked, set its new value as origin square's value + 1 and push the square to queue
		directions.forEach(([dx, dy]) => {
			if (
				0 <= r + dy &&
				r + dy < rows &&
				0 <= c + dx &&
				c + dx < cols &&
				mat[r + dy][c + dx] === -1
			) {
				mat[r + dy][c + dx] = mat[r][c] + 1;
				queue.push([r + dy, c + dx]);
			}
		});
	}

	return mat;
};

/***********************************/

// Iterative solution (Two for loops - process half of possible neighboars in each loop)

// Time complexity = O(n*m) + O(n*m) => O(n*m)
// Space complexity = O(1)

// Use for loops to make two passes and update non-zero squares along the way
// First pass: Check for top and left neighbors
// Second pass: Check for bottom and right neighbors

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
	let m = mat.length,
		n = mat[0].length;

	// First pass: Check for top and left
	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			if (mat[row][col] !== 0) {
				let minNeighbor = Infinity;
				if (row > 0) {
					minNeighbor = Math.min(minNeighbor, mat[row - 1][col]);
				}
				if (col > 0) {
					minNeighbor = Math.min(minNeighbor, mat[row][col - 1]);
				}
				mat[row][col] = minNeighbor + 1;
			}
		}
	}

	// Second pass: Check for bottom and right
	for (let row = m - 1; row >= 0; row--) {
		for (let col = n - 1; col >= 0; col--) {
			if (mat[row][col] !== 0) {
				let minNeighbor = Infinity;
				if (row < m - 1) {
					minNeighbor = Math.min(minNeighbor, mat[row + 1][col]);
				}
				if (col < n - 1) {
					minNeighbor = Math.min(minNeighbor, mat[row][col + 1]);
				}
				mat[row][col] = Math.min(mat[row][col], minNeighbor + 1);
			}
		}
	}

	return mat;
};

/***********************************/

// Recursive solution (naive - leads to TLE error)
// This is akin to a DFS, but better approach would be like BFS (see solution above)

// Time complexity = O()
// Space complexity =

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
// var updateMatrix = function (mat) {
// 	var distanceToZero = function (m, i, j) {
// 		if (m[i][j] === 0) return 0;

// 		let r = m[i]?.[j + 1];
// 		let b = m[i + 1]?.[j];
// 		let l = m[i]?.[j - 1];
// 		let t = m[i - 1]?.[j];

// 		if (r === 0 || b === 0 || l === 0 || t === 0) return 1;

// 		let candidates = [];

// 		if (r) {
// 			candidates.push(distanceToZero(m, i, j + 1) + 1);
// 		}
// 		if (b) {
// 			candidates.push(distanceToZero(m, i + 1, j) + 1);
// 		}
// 		if (l) {
// 			candidates.push(distanceToZero(m, i, j - 1) + 1);
// 		}
// 		if (t) {
// 			candidates.push(distanceToZero(m, i - 1, j) + 1);
// 		}

// 		return Math.min(...candidates);
// 	};

// 	for (let i = 0; i < mat.length; i++) {
// 		for (let j = 0; j < mat[i].length; j++) {
// 			if (mat[i][j] === 1) {
// 				mat[i][j] = distanceToZero(mat, i, j);
// 			}
// 		}
// 	}

// 	return mat;
// };
