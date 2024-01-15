// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

// Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

// The tests are generated such that there is exactly one solution. You may not use the same element twice.

// Your solution must use only constant extra space.

// Example 1:

// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

// Example 2:

// Input: numbers = [2,3,4], target = 6
// Output: [1,3]
// Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

// Example 3:

// Input: numbers = [-1,0], target = -1
// Output: [1,2]
// Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

// Constraints:

// 2 <= numbers.length <= 3 * 10^4
// -1000 <= numbers[i] <= 1000
// numbers is sorted in non-decreasing order.
// -1000 <= target <= 1000
// The tests are generated such that there is exactly one solution.

/***********************************/

// Iterative solution (two pointers)

// Time complexity = O(n)
// Space complexity = O(1)

/*
1. init two pointers at opposite ends of array
2. check if numbers[l] + numbers[r] === target
3. if sum is less than target, increment l, otherwise decrement r
4. return result array
*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
	let l = 0,
		r = numbers.length - 1;
	while (l < r) {
		let sum = numbers[l] + numbers[r];
		if (sum === target) return [l + 1, r + 1];
		target > sum ? l++ : r--;
	}
	return null;
};

/***********************************/

// Iterative solution (brute force)

// Time complexity = O(n^2)
// Space complexity = O(1)

/*
1. Loop using two for loops (i and j)
2. if numbers[i] + numbers[j] === target, return result array;
*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
	let res = [];
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[i] + numbers[j] === target) {
				res.push(i + 1);
				res.push(j + 1);
				return res;
			}
		}
	}
};
