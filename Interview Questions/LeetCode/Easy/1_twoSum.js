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

O(n) - DP with map
NOTE: This works for unsorted array

1. Init map. Each entry will be in [complement]: arrayIndex key/value pairs.
2. For each element in array, check if complement (target sum - current element) exists as key in the map.
3. If key found, return answer as [map.get(complement), currentElementIndex].
4. Otherwise update map with map.set(nums[currentElementIndex], currentElementIndex);
5. Repeat steps 2 - 4 until you find the answer.

O(nlogn) - Two Pointers with sorted array
Note: O(n) if array is presorted

1. Sort input array
2. Set two pointers i = 0, j = array.length - 1
3. check sum of values at pointers
4. if sum is greater than target, decrement right pointer
5. if sum is less than target, increment left pointer


O(n^2) - Brute Force (nested for loops)
NOTE: This works unsorted or sorted

1. Set up 2 nested for loops with i starting at 0 and j starting at i + 1
2. Add element at i with element at j
3. compare the sum with the target
4. If sum is equal to target, return the indices of these two elements as the answer
5. If sum is not equal to target, contiue looping


*/
/***********************************/

// DP solution (with JS Map)

// Time complexity = O(n)
// Space complexity = O(n)

// Use map or object to store an index reference to each visisted element in nums - this means you only have to do one loop at most

// 1. Init map
// 2. For each element in array, check if complement (target sum - current element) exits in the map.
// 3. If found, return answer as [map.get(complement), currentElementIndex].
// 4. Otherwise update map with map.set(nums[currentElementIndex], currentElementIndex);
// 5. Repeat steps 2 - 4 until you find the answer.

const twoSumWithMap = (nums, target) => {
	// create map to store indices of visited array elements
	let hash = new Map();

	for (let i = 0; i < nums.length; i++) {
		// Check if map contains match for required complement
		let complement = target - nums[i];
		if (hash.has(complement)) {
			return [hash.get(complement), i];
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

// Two pointers (with sorted array)

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

// Iterative solution (brute force)

// Time Complexity = n * (n - 1) / 2 = n2 - 2n ≈ n2 = O(n^2) ie
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
