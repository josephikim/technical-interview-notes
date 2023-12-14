// Youtube: https://www.youtube.com/watch?v=rw4s4M3hFfs

// You are moving to a new apartment and have to decide which neighborhood block you want to live in. The blocks are arranged in a row, each of them has an equally suitable apartment to live in. However, you also have a set of requirements to meet (e.g. gym, school, store) regarding how far you would have to travel to visit the nearest instance of each requirement type.

// You are given info for each block, whether it contains the items in your requirements list, marked by a boolean. Eg:

blocks = [
	{ gym: false, school: true, store: false },
	{ gym: true, school: false, store: false },
	{ gym: true, school: true, store: false },
	{ gym: false, school: true, store: false },
	{ gym: false, school: true, store: true },
];

// blocks = [
// 	{ gym: true, school: false, store: true },
// 	{ gym: false, school: false, store: false },
// 	{ gym: false, school: false, store: false },
// 	{ gym: false, school: true, store: true },
// 	{ gym: true, school: false, store: false },
// ];

reqs = ["gym", "school", "store"];

// Your goal is the find the block which minimizes the MAX distance you would need to travel for any of your requirements.
// E.g. if you lived in the first block, your max distance would be 4 since the nearest store is 4 blocks away.

// Contraints
// 1 < num of blocks
// array of requirements has at least one element
// each block will have a boolean value for each element in reqs
// distance between any two adjacent blocks is 1

/***********************************/

// Iterative solution

// Time complexity = O(n*m) => O(n^2) for large n and m
// Space complexity = O(n*m) => O(n^2) for large n and m

// 0. Track a result variable which will eventually return the lowest of those max values stored in dp
// 1. Use a dp (2d array) to track the min distance to each requirement at a particular block, as well as the max value from those distances.
// 2. Init dp with Number.MAX_VALUE
// 3. Init dp[0] with info about first block
// 4. starting with second block, loop through the array from left to right updating dp relative to the values from the previous block
// 5. starting with second to last block, loop through the array from right to left, filling in dp with the values that could not be calculated on the first pass
// 6. return result

var findShortestMaxDistance = function (blocks, reqs) {
	let n = blocks.length;
	let m = reqs.length;
	let dp = new Array(n)
		.fill(0)
		.map(() => new Array(m + 1).fill(Number.MAX_SAFE_INTEGER)); // init dp with MAX_SAFE_INTEGER
	let result = Number.MAX_SAFE_INTEGER;

	// init first row of dp
	for (i = 0; i < m; i++) {
		if (blocks[0][reqs[i]] == true) {
			dp[0][i] = 0;
		}
		dp[0][m] = Math.max(dp[0][m], dp[0][i]);
	}

	// first pass - loop blocks starting at second block
	for (i = 1; i < n; i++) {
		dp[i][m] = 0;
		for (j = 0; j < m; j++) {
			if (blocks[i][reqs[j]] == true) {
				dp[i][j] = 0;
			} else {
				if (dp[i - 1][j] !== Number.MAX_SAFE_INTEGER) {
					dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + 1);
				}
			}
			dp[i][m] = Math.max(dp[i][m], dp[i][j]); // update max each time any requirement's distance is updated
		}
	}

	// second pass - loop backward starting at second to last block
	for (i = n - 2; i >= 0; i--) {
		dp[i][m] = 0; // needs to be set on second run as well since first pass might have still have dp[i][m] values of MAX_SAFE_INTEGER
		for (j = 0; j < m; j++) {
			// dont' need to check for if (blocks[i][reqs[j]] == true) bc all true value would have been encountered on the first pass
			dp[i][j] = Math.min(dp[i][j], dp[i + 1][j] + 1); // don't need to check if (dp[i + 1][j] !== Number.MAX_SAFE_INTEGER bc last row in dp should no longer have placeholder values
			dp[i][m] = Math.max(dp[i][m], dp[i][j]); // update max each time any requirement's distance is updated
		}
		result = Math.min(result, dp[i][m]); // this happens after each row in dp has been processed, otherwise it might reflect a temporary state where dp[i][m] was lower than its final value
	}

	return result;
};

console.log(findShortestMaxDistance(blocks, reqs));
