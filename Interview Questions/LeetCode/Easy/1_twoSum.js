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

// Iterative solution (sorted array with two pointers)

// Note: ONLY WORKS FOR SORTED ARRAY (which would allow O(n)). If input is unsorted, it adds complexity bc we have to use sort() or toSorted() on original array and also recover indices from original array accounting for duplicate values.
// If you have to leave array unsorted, consider using map-based solutions below for a O(n) solution.

// Time complexity = O(n) + O(nlogn) for array.sort => O(nlogn)
// Space complexity = O(1)

// Algo (assuming sorted array)
// 1. Init i at 0 and j at end
// 2. check sum against target
// 3. if found, return result
// 4. if less than target, increment i. If more than target, decrement j
// 5. repeat steps 2 - 4

const twoSumSorted = (nums, target) => {
	let i = 0,
		j = nums.length - 1;
	while (i < j) {
		let sum = nums[i] + nums[j];
		if (target === sum) return [i, j];
		target > sum ? i++ : j--;
	}
	return null;
};

/***********************************/

// Iterative solution (with JS Map)

// Time complexity = O(n)
// Space complexity = O(n)

// Algo
// Use map or object to store a reference to each visisted element in nums - this means you only have to do one loop at most

// 1. Init map
// 2. Loop each element in nums
// 3. In each iteration check if target difference (ie target sum - current number) is present in the map.
// 4. If present, return [map[target], current index] as result.
// 5. Otherwise add the target difference as map's key and current index as value.
// 6. Repeat steps 3 - 5 until you find the result.

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

// same logic as above but using object instead of map

// var twoSumBest = function (nums, target) {
// 	if (nums.length < 2) {
// 		return [];
// 	}

// 	const map = {};

// 	for (let i = 0; i < nums.length; i++) {
// 		const complement = target - nums[i];

// 		if (map[complement] !== undefined) {
// 			return [map[complement], i];
// 		}

// 		map[nums[i]] = i;
// 	}

// 	return [];
// };

/***********************************/

// Iterative solution (naive)

// Time Complexity = n * (n - 1) / 2 = n2 - 2n ≈ n2 = O(n2) ie
// Space Complexity = we are not using any extra data structure hence our space complexity would be O(1)

// Set up nested loops with i starting at 0 and j starting at i + 1
// Add element at i with element at j
// After adding, compare the sum with the given target
// If the sum is equal to the target, return the indices of these two elements
// If the sum is not equal to the target, we check for the next pair

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
 * Still naive, bc still involves 2 for loops (bc indexOf() uses a simple for loop under the hood)
 * No savings to time or space complexity
 */

const twoSumBrute2 = (nums, target) => {
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

// Runtime

let nums = [0, 2, 4, 6, 8];

const result = twoSumBest(nums, 12);

console.log({ result });
