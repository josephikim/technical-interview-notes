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

// Iterative solution (naive)

// Time complexity =
// Space complexity =

// Algorithm
// for any given value in nums, we want unique combinations of two other values in nums that add up to the complement
// Those unique combinations should be tracked along with the complement value
// Strat 1: track the three values in 2 nested objects, with value1 as outer object key, value2 as inner object key and the complement as the inner object's value

// 1. loop through nums using l and r pointers
// 2. create a map with key being array of indices [i1, i2] and value being the complement to the sum of values at the given indices
// 3.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	// checks if candidate solution is unique from existing solutions
	var isUniqueSolution = function (solutions, arr) {
		let str = arr.sort().join();
		return !solutions.some((solution) => {
			return solution == arr;
		});
	};

	let i = 0,
		j = 1;
	// object of tuples of indices, keyed by complement value
	let comps = new Set();
	let solutions = [];
	// check all combinations of indices
	for (i = 0; i < nums.length - 1; i++) {
		for (j = i + 1; j < nums.length; j++) {
			if (comps.has(nums[i])) {
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
						solutions.push(
							[nums[i], nums[tuple[0]], nums[tuple[1]]].sort().join()
						);
				});
			}

			let comp = nums[i] + nums[j] !== 0 ? -(nums[i] + nums[j]) : 0;

			comps.add(comp);
			// push indices to map
			// if (!map[complement]) {
			// 	map[complement] = [[i, j]];
			// } else {
			// 	map[complement] = [...map[complement], [i, j]];
			// }

			// if complement exists in nums, its mapped indices are unique from the index of complement, and the triplet is a unique solution, push triplet to solutions

			// if (map[nums[i]]) {
			// 	map[nums[i]].forEach((tuple) => {
			// 		if (
			// 			i !== tuple[0] &&
			// 			i !== tuple[1] &&
			// 			isUniqueSolution(solutions, [
			// 				nums[i],
			// 				nums[tuple[0]],
			// 				nums[tuple[1]],
			// 			])
			// 		)
			// 			solutions.push(
			// 				[nums[i], nums[tuple[0]], nums[tuple[1]]].sort().join()
			// 			);
			// 	});
			// }
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
						solutions.push(
							[nums[j], nums[tuple[0]], nums[tuple[1]]].sort().join()
						);
				});
			}
		}
	}
	return solutions.map((solution) => solution.split(","));
};
