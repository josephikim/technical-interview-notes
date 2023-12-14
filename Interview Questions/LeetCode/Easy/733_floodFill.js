// An image is represented by an m x n integer grid image where image[i][j] represents the pixel value of the image.
// You are also given three integers sr, sc, and color. You should perform a flood fill on the image starting from the pixel image[sr][sc].

// To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with color.

// Return the modified image after performing the flood fill.

// Example 1:

// Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr(starting row) = 1, sc(starting col) = 1, color = 2
// Output: [[2,2,2],[2,2,0],[2,0,1]]
// Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
// Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.

// Example 2:

// Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
// Output: [[0,0,0],[0,0,0]]
// Explanation: The starting pixel is already colored 0, so no changes are made to the image.

// Constraints:

// m == image.length
// n == image[i].length
// 1 <= m, n <= 50
// 0 <= image[i][j], color < 216
// 0 <= sr < m
// 0 <= sc < n

/***********************************/

// BFS Iterative solution

// Time complexity = O(m x n)
// Space complexity = O(m x n) for queue

// 1. check base case where old color equals new color at (sr, sc)
// 2. init a queue with (sr, sc)
// 3. pull first element from queue, update matrix's color at element's coordinates
// 4. check each 4-directional neighbor. if neighbor has old color, push neighbor's coordinates to queue
// 5. repeat steps 3 and 4 until queue is empty
// 6. return result image

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
	const oldColor = image[sr][sc];
	if (oldColor == color) return image;
	const queue = [{ sr, sc }];

	while (queue.length > 0) {
		const c = queue.shift();
		image[c.sr][c.sc] = color;

		const up = c.sr - 1,
			down = c.sr + 1;
		const left = c.sc - 1,
			right = c.sc + 1;
		if (up >= 0 && image[up][c.sc] == oldColor)
			queue.push({ sr: up, sc: c.sc });
		if (down < image.length && image[down][c.sc] == oldColor)
			queue.push({ sr: down, sc: c.sc });
		if (left >= 0 && image[c.sr][left] == oldColor)
			queue.push({ sr: c.sr, sc: left });
		if (right < image[0].length && image[c.sr][right] == oldColor)
			queue.push({ sr: c.sr, sc: right });
	}
	return image;
};

/***********************************/

// Recursive solution

// Time complexity = worst case O(m x n)
// Space complexity = O(m x n)

// This example is effectively same as below but with more efficient checks

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
	// Store the original color of the starting pixel
	let originalColor = image[sr][sc];

	// If the original color is the same as new color, no operation is needed
	if (originalColor === newColor) return image;

	// Define the recursive Depth-First Search function
	let dfs = function (row, col) {
		// If the pixel is out of the image boundaries or is not of original color, return
		if (
			row < 0 ||
			row >= image.length ||
			col < 0 ||
			col >= image[0].length ||
			image[row][col] !== originalColor
		)
			return;

		// Change the color of the pixel to the new color
		image[row][col] = newColor;

		// Recursively apply the DFS function to the neighboring pixels
		dfs(row - 1, col); // Up
		dfs(row + 1, col); // Down
		dfs(row, col - 1); // Left
		dfs(row, col + 1); // Right
	};

	// Start the Depth-First Search from the starting pixel
	dfs(sr, sc);

	// Return the modified image after the flood fill operation
	return image;
};

// use DFS with a recursive fill function
// This example has less efficient checks but arguably more readable

// /**
//  * @param {number[][]} image
//  * @param {number} sr
//  * @param {number} sc
//  * @param {number} color
//  * @return {number[][]}
//  */
// var floodFill = function (image, sr, sc, color) {
// 	const startColor = image[sr][sc];
// 	if (startColor === color) return image;

// 	var recursiveFill = function (r, c) {
// 		if (image[r][c] === startColor) {
// 			image[r][c] = color;

// 			// right neighbor
// 			if (image[r][c + 1] !== undefined) {
// 				recursiveFill(r, c + 1);
// 			}
// 			// bottom neighbor
// 			if (image[r + 1] !== undefined) {
// 				recursiveFill(r + 1, c);
// 			}
// 			// left neighbor
// 			if (image[r][c - 1] !== undefined) {
// 				recursiveFill(r, c - 1);
// 			}
// 			// top neighbor
// 			if (image[r - 1] !== undefined) {
// 				recursiveFill(r - 1, c);
// 			}
// 		}
// 	};
// 	recursiveFill(sr, sc);
// 	console.log(image);
// 	return image;
// };

/***********************************/

// Naive recursive solution

// Time complexity = worst case O(4N + 4) => O(N) where N = m X n, because every pixel is checked along with its 4 neighbors
// Space complexity = worst case O(N)
//
// check all 4 neighbors of starting pixel
// if flood eligible, update pixel value and recur check for each neighbor pixel

// /**
//  * @param {number[][]} image
//  * @param {number} sr
//  * @param {number} sc
//  * @param {number} color
//  * @return {number[][]}
//  */
// var floodFill = function (image, sr, sc, color) {
// 	var startColor = image[sr][sc];
// 	var width = image.length;
// 	var height = image[0].length;

// 	var processPixel = function (r, c) {
// 		// check if pixel location is within image dimensions
// 		if (!between(r, 0, width - 1) || !between(c, 0, height - 1)) return;

// 		// check if pixel is flood eligible and already matches target color
// 		if (image[r][c] == startColor && image[r][c] !== color) {
// 			image[r][c] = color;
// 			processPixel(r, c + 1);
// 			processPixel(r + 1, c);
// 			processPixel(r, c - 1);
// 			processPixel(r - 1, c);
// 		}
// 	};

// 	processPixel(sr, sc);
// 	return image;
// };

// var between = function (x, min, max) {
// 	return min <= x && x <= max;
// };

// let image = [
// 	[1, 1, 1],
// 	[1, 1, 0],
// 	[1, 0, 1],
// ];
// let sr = 1;
// let sc = 1;
// let color = 2;
let image = [
	[0, 0, 0],
	[0, 0, 0],
];
let sr = 0;
let sc = 0;
let color = 2;

floodFill(image, sr, sc, color);
