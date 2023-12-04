// Find Min and Max element in array

// Given an array nums of size n, find the maximum and minimum elements present in the array. Our algorithm should make the minimum number of comparisons.

/***********************************/

// Iterative solution (optimal)

// Time complexity = O(n) but fewer comparisons (3 comparison per 2 elements, instead of 4 per 2 in naive solution)
// Space complexity = O(1)

// 1. track an index which we will use to iterate nums two elements at a time
// 2. for each pair of elements, compare each other's value
// 3. update man by comparing with higher value
// 4. update min by comparing with lower value
// 5. return result

/**
 * @param {number[]} nums
 * @param {number} n (nums.length)
 * @return {number[]}
 */
var findMinMax = function (nums, n) {
	let max,
		min,
		i = 0;

	if (n % 2 != 0) {
		max = nums[0];
		min = nums[0];
	} else {
		if (nums[0] < nums[1]) {
			max = nums[1];
			min = nums[0];
		} else {
			max = nums[0];
			min = nums[1];
		}
	}

	while (i < n) {
		if (nums[i] < nums[i + 1]) {
			if (nums[i] < min) {
				min = nums[i];
			}
			if (nums[i + 1] > max) {
				max = nums[i + 1];
			}
		} else {
			if (nums[i] > max) {
				max = nums[i];
			}
			if (nums[i + 1] < min) {
				min = nums[i + 1];
			}
		}
		i = i + 2;
	}

	return [max, min];
};

/***********************************/

// Recursive solution

// Time complexity = O(n) but less total comparisons than iterative naive solution
// Space complexity = O(logn) ie height of recursion tree

// 1. if base case (l == r) set max and min to nums[l]
// 2. if base case (l + 1 == r) compare nums[l], nums[r] and update max / min
// 3. otherwise split the array at the midpoint and call main function recursively for each half of the array
// 4. once all calls return, return max and min

/**
 * @param {number[]} nums
 * @param {number} l (starting left index)
 * @param {number} r (starting right index)
 * @return {number[]}
 */
// var findMinMax = function (nums, l, r) {
// 	let max = 0;
// 	let min = 0;

// 	if (l === r) {
// 		max = nums[l];
// 		min = nums[l];
// 	} else if (l + 1 === r) {
// 		if (nums[l] < nums[r]) {
// 			max = nums[r];
// 			min = nums[l];
// 		} else {
// 			max = nums[l];
// 			min = nums[r];
// 		}
// 	} else {
// 		let mid = Math.floor((l + r - 1) / 2);
// 		leftMinMax = findMinMax(nums, l, mid);
// 		rightMinMax = findMinMax(nums, mid + 1, r);
// 		if (leftMinMax[0] > rightMinMax[0]) {
// 			max = leftMinMax[0];
// 		} else {
// 			max = rightMinMax[0];
// 		}
// 		if (leftMinMax[1] < rightMinMax[1]) {
// 			min = leftMinMax[1];
// 		} else {
// 			min = rightMinMax[1];
// 		}
// 	}
// 	return [max, min];
// };

/***********************************/

// Iterative solution (naive)

// Time complexity = O(n)
// Space complexity = O(1)

// 1. use two variables to track max and min values
// 2. loop through array, updating variables at each iteration
// 3. return max and min

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// var findMinMax = function (nums) {
// 	let max = Number.MIN_SAFE_INTEGER;
// 	let min = Number.MAX_SAFE_INTEGER;

// 	for (const num of nums) {
// 		max = Math.max(max, num);
// 		min = Math.min(min, num);
// 	}

// 	return [max, min];
// };

/***********************************/

// Iterative solution (pointers)

// Time complexity = O(n)
// Space complexity = O(1)

// 1. use two pointers to track indices of max and min values
// 2. loop through array, updating pointers at each iteration
// 3. return values at those indices

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// var findMinMax = function (nums) {
// 	let iMax = 0;
// 	let iMin = 0;
// 	for (let i = 1; i < nums.length; i++) {
// 		if (nums[i] > nums[iMax]) iMax = i;
// 		if (nums[i] < nums[iMin]) iMin = i;
// 	}

// 	return [nums[iMax], nums[iMin]];
// };

let nums = [4, 2, 0, 8, 20, 9, 2, -1];
console.log(findMinMax(nums, nums.length));
