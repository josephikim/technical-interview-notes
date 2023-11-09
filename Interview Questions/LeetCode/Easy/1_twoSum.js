// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.

// Follow-up: Can you come up with an algorithm that is less than O(n^2) time complexity?

/***********************************/

/* 
 * Optimized answer
 * Use map or object to store a reference to each visisted element in nums - this means you only have to do one loop at most
 * 
 * Time Complexity = O(n) worst case
 * Space Complexity =  O(n) worse case
 * 
 * For a given input array this algorithm does the following steps:

Create a map which accepts integer datatype as key and value.
Iterate through each element in the given array starting from the first element.
In each iteration check if required number (required  number = target sum - current number) is present in the map.
If present, return [required number index, current number index] as  result.
Otherwise add the required number as key and its index as value to the map. Repeat this  until you find the result.

 */
const twoSumWithMap = (nums, target) => {
	// create map to store indices of visited array elements
	let hash = new Map();

	for (let i = 0; i < nums.length; i++) {
		// Check if map contains match for target difference
		let difference = target - nums[i];
		if (hash.has(difference)) {
			return [hash.get(difference), i];
		} else {
			hash.set(nums[i], i);
		}
	}
	console.log({ hash });
	return null;
};

var twoSumBest = function (nums, target) {
	if (nums.length < 2) {
		return [];
	}

	const map = {};

	for (let i = 0; i < nums.length; i++) {
		const complement = target - nums[i];

		if (map[complement] !== undefined) {
			return [map[complement], i];
		}

		map[nums[i]] = i;
	}

	return [];
};

// Naive solution

// Take one element
// Add this element with every other element
// After adding, compare the sum with the given target
// If the sum is equal to the target, return the indices of these two elements
// If the sum is not equal to the target, we check for the next pair

/**
 *
 * BAD bc it takes quadratic time which is bad for large inputs
 *
 * Time Complexity = n * (n - 1) / 2 = n2 - 2n ≈ n2 = O(n2)
 * Space Complexity = we are not using any extra data structure hence our space complexity would be O(1)
 */

const twoSumBrute = (nums, target) => {
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] == target) {
				return [i, j];
			}
		}
	}
	return null;
};

/*
 * Still naive, bc still involves 2 for loops (eg indexOf() actually uses a simple for loop under the hood)
 * No savings to time or space complexity
 */
const twoSumBruteTwo = (nums, target) => {
	// outer for loop
	for (const [i, num] of Object.entries(nums)) {
		// inner for loop
		const matchIndex = nums.indexOf(target - num);

		if (matchIndex > -1) {
			return [parseInt(i), matchIndex];
		}
	}
	return null;
};

// RUNTIME

let nums = [0, 2, 4, 6, 8];

const result = twoSumBest(nums, 12);

console.log({ result });
