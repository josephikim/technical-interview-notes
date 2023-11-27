// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

// Example 1:

// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].

// Note 1: the order of the output and the order of the triplets does not matter.
// Note 2: if there are multiple instances of the same value in nums, any of them can be used in a triplet as long all triplets themseleves are unique in terms of contained values. EG nums = [-1, -1, -1, 0, 1] will only produce one triplet [-1, 0, 1]

// Example 2:

// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:

// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

// Constraints:

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

/***********************************/

// Iterative solution (improved)

// Time complexity = O(n^2) => we can ignore the initial sorting complexity nlogn bc it is dominated the by n^2 arithmetic summation
// Space complexity = O(n^2) if you count result array

// Algorithm
// The key is to deconstruct the three-sum problem into n iterations of the two-sum problem (ie Leetcode 1).
// This can be made more efficient by sorting nums before looping. This is ok because the solution will consists of values in nums, not indices.

// 1. sort nums numerically, init solutions array
// 2. Loop through nums starting at i = 0
// 3. starting at the second element, if nums[i] equals nums[i-1], skip that loop
// 4. Else, for each i, get the possible unique twoSum solutions for the array from i + 1 to nums.length -1.
// 5. For each twoSum solution s, push the triplet [nums[i], s[0], s[1]] to solutions array

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	nums.sort((a, b) => a - b);
	let solutions = [];

	// loop through each element in nums
	for (i = 0; i < nums.length - 2; i++) {
		// enforce uniqueness by skipping duplicates in nums[i]
		if (i > 0 && nums[i] == nums[i - 1]) continue;
		// skip any triplets where smallest number is positive (bc that triplet cannot add to zero)
		if (nums[i] > 0) continue;

		let target = nums[i] !== 0 ? -nums[i] : 0;

		// get the twoSum solutions starting at i + 1 and push unique triplets to solutions array
		let j = i + 1;
		let k = nums.length - 1;

		while (j < k) {
			let sum = nums[j] + nums[k];
			if (target === sum) {
				let triplet = [nums[i], nums[j], nums[k]];
				solutions.push(triplet);

				// enforce uniqueness by skipping duplicates in nums[j] or nums[k]
				while (j < k && nums[j] == triplet[1]) j++;
				while (j < k && nums[k] == triplet[2]) k--;
			} else if (target > sum) {
				j++;
			} else {
				k--;
			}
		}
	}
	return solutions;
};
/***********************************/

// Iterative solution (naive)

// Note: This is NOT A WORKING SOLUTION due to stack overflow. Storing every possible combination of indices in nums and their complement is not efficient. This code in included just for analysis purposes.

// Time complexity = greater than O(n^2)
// Space complexity =

// Algorithm
// For any combination of two indices in nums, store their complement value in a JS map with the complement as key, and indices as an array value.
// Anytime the current index lands on a value that matches a key in map, create a triple using the key and elements in nums that correspond the indices in mapped value(s). Add this to potential solutions.
// Once finished looping, filter solutions for unique solutions.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	// checks if candidate solution is unique from existing solutions
	var isUniqueSolution = function (solutions, arr) {
		let str = arr.sort((a, b) => a - b).join();
		return !solutions.some((solution) => {
			return solution.sort((a, b) => a - b).join() === arr;
		});
	};

	let i = 0,
		j = 1;
	// object of tuples of indices, keyed by complement value
	let map = {};
	let solutions = [];
	// check all combinations of indices
	for (i = 0; i < nums.length - 1; i++) {
		for (j = i + 1; j < nums.length; j++) {
			let comp = nums[i] + nums[j] !== 0 ? -(nums[i] + nums[j]) : 0;
			// push indices to map
			if (!map[complement]) {
				map[complement] = [[i, j]];
			} else {
				map[complement] = [...map[complement], [i, j]];
			}

			// if complement exists in nums, its mapped indices are unique from the index of complement, and the triplet is a unique solution, push triplet to solutions
			if (map[nums[i]]) {
				map[nums[i]].forEach((tuple) => {
					if (
						i !== tuple[0] &&
						i !== tuple[1] &&
						isUniqueSolution(solutions, [
							nums[i],
							nums[tuple[0]],
							nums[tuple[1]],
						])
					)
						solutions.push([nums[i], nums[tuple[0]], nums[tuple[1]]]);
				});
			}
			if (map[nums[j]]) {
				map[nums[j]].forEach((tuple) => {
					if (
						j !== tuple[0] &&
						j !== tuple[1] &&
						isUniqueSolution(solutions, [
							nums[j],
							nums[tuple[0]],
							nums[tuple[1]],
						])
					)
						solutions.push([nums[j], nums[tuple[0]], nums[tuple[1]]]);
				});
			}
		}
	}
	return solutions;
};
