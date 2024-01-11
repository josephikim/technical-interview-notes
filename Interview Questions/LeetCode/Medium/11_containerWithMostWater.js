// You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

// Example 1:

// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

// Example 2:

// Input: height = [1,1]
// Output: 1

// Constraints:

// n == height.length
// 2 <= n <= 10^5
// 0 <= height[i] <= 10^4

/***********************************/

// Iterative solution (optimal)
// This solution uses two pointers starting at opposite ends of the array

// time complexity =
// space complexity =

/*
1. init pointers l = 0, r = height.length - 1, maxArea = 0
2. loop the array while l < r
3. calculate area and update maxArea
4. increment l until height[l]
5. if (height[l] <= height[r]) increment l until height[new l] is greater than height[l]
6. if (height[r] < height[l]) decrement r until height[new r] is greater than height[r]
7. finish loop and return maxArea

*/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
	let maxArea = 0;
	let l = 0;
	let r = height.length - 1;
	while (l < r) {
		let area = Math.min(height[l], height[r]) * (r - l);
		maxArea = Math.max(maxArea, area);

		if (height[l] <= height[r]) {
			// OPTIONAL: further optimize by skipping l's where element at newL is not greater than element at l
			// THIS IS
			// let newL = l + 1;
			// while (height[newL] <= height[l]) {
			// 	newL++;
			// }
			// l = newL;
			l++;
		} else {
			// OPTIONAL: further optimize by skipping r's where element at newR is not greater than element at r
			// let newR = r - 1;
			// while (height[newR] <= height[r]) {
			// 	newR--;
			// }
			// r = newR;
			r--;
		}
	}

	return maxArea;
};

/***********************************/

// Iterative solution (brute force 2)
// This solution uses sliding window with l and r pointers
// This solution is NOT efficient for large N

// time complexity = O(n^2)
// space complexity = O(1)

/*
1. init maxArea = 0, left pointer = 0, right pointer = 1
2. Loop array using while(l < height.length - 1)
3. for each combination of l and r, calculate max area
4. if max area is greater than current maxArea, update maxArea
5. increment r, then if r is beyond height.length, slide window forward by one
6. return maxArea
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
	let maxArea = 0;
	let l = 0,
		r = 1;
	while (l < height.length - 1) {
		let area = Math.min(height[l], height[r]) * (r - l);
		maxArea = Math.max(maxArea, area);
		r++;
		if (r >= height.length) {
			l++;
			r = l + 1;
		}
	}

	return maxArea;
};

/***********************************/

// Iterative solution (brute force 1)
// This solution uses nested for loops
// This solution is NOT efficient for large N

// time complexity = O(n^2)
// space complexity = O(1)

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
	let maxArea = 0;

	for (let i = 0; i < height.length; i++) {
		for (let j = i + 1; j < height.length; j++) {
			let area = (j - i) * Math.min(height[i], height[j]);
			maxArea = Math.max(maxArea, area);
		}
	}

	return maxArea;
};
