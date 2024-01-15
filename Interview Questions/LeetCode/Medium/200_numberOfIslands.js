// Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

// An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// Input: grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// Output: 1

// Example 2:

// Input: grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// Output: 3

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] is '0' or '1'.

/*******************************/

// DFS solution

// Time complexity : O(M×N) where M is the number of rows and N is the number of columns.

// Space complexity : worst case O(M×N) in case that the grid map is completely filled with lands where DFS goes by M×N deep.

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
	if (grid == null || grid.length == 0) {
		return 0;
	}

	var dfs = function (grid, r, c) {
		let nr = grid.length;
		let nc = grid[0].length;

		if (r < 0 || c < 0 || r >= nr || c >= nc || grid[r][c] == "0") {
			return;
		}

		grid[r][c] = "0";
		dfs(grid, r - 1, c);
		dfs(grid, r + 1, c);
		dfs(grid, r, c - 1);
		dfs(grid, r, c + 1);
	};

	let nr = grid.length;
	let nc = grid[0].length;
	let nIslands = 0;
	for (let r = 0; r < nr; ++r) {
		for (let c = 0; c < nc; ++c) {
			if (grid[r][c] == "1") {
				nIslands++;
				dfs(grid, r, c);
			}
		}
	}

	return nIslands;
};

/***********************************/

// BFS solution (optimal)

// Time complexity : O(M×N) where M is the number of rows and N is the number of columns.

// Space complexity : O(min(M,N)) because in worst case where the grid is completely filled with lands, the size of queue can grow up to min(M,N).

/*
1. loop through squares in grid
2. if a '1' is hit, mark it as visited by changing its value to '0', add the square's ID to visitedLands queue, and increment nIslands
3. NOTE: instead of a 2-D coordinate system, we can just use single ID value corresponding to a grid location, and derive its specific row/column. See comment in code.
4. while visitedLands is not empty, visit each of its 4-directional neighbors and repeat step 2 for each
5. return nIslands
*/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
	if (grid == null || grid.length == 0) {
		return 0;
	}

	let nr = grid.length;
	let nc = grid[0].length;
	let nIslands = 0;

	for (let r = 0; r < nr; ++r) {
		for (let c = 0; c < nc; ++c) {
			if (grid[r][c] == "1") {
				nIslands++;
				grid[r][c] = "0"; // mark as visited
				let visitedLands = [];
				visitedLands.push(r * nc + c); // uses a id-based coordinate system for simplicity (eg for a 3X3 grid, id '7' corresponds to square at row 3, col 1)
				while (visitedLands.length) {
					// NOTE: can alternatively do an iterative DFS by using array.pop()
					let id = visitedLands.shift();
					let row = Math.trunc(id / nc);
					let col = id % nc;
					if (row - 1 >= 0 && grid[row - 1][col] == "1") {
						visitedLands.push((row - 1) * nc + col);
						grid[row - 1][col] = "0";
					}
					if (row + 1 < nr && grid[row + 1][col] == "1") {
						visitedLands.push((row + 1) * nc + col);
						grid[row + 1][col] = "0";
					}
					if (col - 1 >= 0 && grid[row][col - 1] == "1") {
						visitedLands.push(row * nc + col - 1);
						grid[row][col - 1] = "0";
					}
					if (col + 1 < nc && grid[row][col + 1] == "1") {
						visitedLands.push(row * nc + col + 1);
						grid[row][col + 1] = "0";
					}
				}
			}
		}
	}

	return nIslands;
};

/*******************************/

// BFS solution (suboptimal)

// Time complexity : O(M×N) where M is the number of rows and N is the number of columns.

// Space complexity : O(min(M,N)) because in worst case where the grid is completely filled with lands, the size of queue can grow up to min(M,N).

function numIslands(grid) {
	let nIslands = 0;

	const bfs = (i, j) => {
		const queue = [[i, j]];

		while (queue.length) {
			// using shift() may cause TLE exceptions due to each call being O(n). You can try queue.pop() at O(1) per call, but this makes the algo an iterative DFS.
			const [x, y] = queue.shift();

			// This sets 'marked' in the grid
			grid[x][y] = 0;

			const arr = [
				[x + 1, y],
				[x, y + 1],
				[x - 1, y],
				[x, y - 1],
			];
			for (let i = 0; i < arr.length; i++) {
				if (
					arr[i][0] >= 0 &&
					arr[i][0] < grid.length &&
					arr[i][1] >= 0 &&
					arr[i][1] < grid[0].length &&
					grid[arr[i][0]][arr[i][1]] === "1"
				) {
					queue.push([arr[i][0], arr[i][1]]);
				}
			}
		}
	};

	for (let i = 0; i < grid.length; i += 1) {
		for (let j = 0; j < grid[0].length; j += 1) {
			if (grid[i][j] === "1") {
				nIslands += 1;
				bfs(i, j);
			}
		}
	}
	return nIslands;
}
