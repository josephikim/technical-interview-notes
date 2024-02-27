// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

// Example 1:

// Input: nums = [1,2,3,1]
// Output: true
// Example 2:

// Input: nums = [1,2,3,4]
// Output: false
// Example 3:

// Input: nums = [1,1,1,3,3,4,3,2,4,2]
// Output: true

// Constraints:

// 1 <= nums.length <= 105
// -109 <= nums[i] <= 109

/***********************************/

// Set-based solution

// Time complexity = O(N)
// Space complexity = O(N)

// init empty Set
// loop through nums
// check if set has element
// if found return true, else add element to set

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
	var set1 = new Set();
	for (var i = 0; i < nums.length; i++) {
		if (set1.has(nums[i])) {
			return true;
		} else {
			set1.add(nums[i]);
		}
	}
	return false;
};

/***********************************/

// Set-based solution 2

// Time complexity = O(N) but longer on average than solution 1 above
// Space complexity = O(N)

// if a duplicate exists, nums.length will be greater than Set(nums)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
	const set = new Set(nums);
	return nums.length != set.size;
};

/***********************************/

// Iterative solution (nested for loops)

// Time complexity = O(N)
// Space complexity = O(1)

// use two for loops to compare each element in nums with all remaining elements
// this solution takes longer time complexity, but less space complexity than solution below

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] === nums[j]) {
				return true;
			}
		}
	}
	return false;
};

/***********************************/

// Iterative solution (naive)

// Time complexity = O(NlogN) due to sorting
// Space complexity = O(N

// base case if nums.legnth === 1, return false
// sort nums array
// init last as sorted[0]
// loop through sorted, compare sorted[i] to last
// if matches, return true, else return false

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
	if (nums.length === 1) return false;
	let sorted = nums.sort();
	let last = sorted[0];
	for (let i = 1; i < sorted.length; i++) {
		if (sorted[i] === last) return true;
		last = sorted[i];
	}
	return false;
};

// same logic as above

// var containsDuplicate = function (nums) {
// 	arr1 = nums.sort();
// 	if (nums.length > 1) {
// 		console.log(arr1);
// 		for (let i = 1; i < nums.length; i++)
// 			if (arr1[i] === arr1[i - 1]) {
// 				return true;
// 			}
// 	} else {
// 		return false;
// 	}
// 	return false;
// };
