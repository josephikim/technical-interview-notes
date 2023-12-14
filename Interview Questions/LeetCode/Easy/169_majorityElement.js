// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

// Example 1:

// Input: nums = [3,2,3]
// Output: 3

// Example 2:

// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// Constraints:

// n == nums.length
// 1 <= n <= 5 * 104
// -109 <= nums[i] <= 109

// Follow-up: Could you solve the problem in linear time and in O(1) space?

/***********************************/

// Iterative solution (better)

// Time complexity = O(n)
// Space complexity = O(1)

// NOTE: this solution will loop through entire array, but still O(n)
// 1. instead of tracking total occurences of majority element, we just want to track how often an element occurs relative to a previous 'breakeven' point
// 2. tracked element will update after every breakeven point
// 3. Eg, for [1, 2, x, y, z], on the third element, we are at a breakevent point. Disregard previous elements and just start tracking occurences of 'x'
// after looping entire array, return latest tracked element

// Why this works? Because assuming there exists a majority element (from either an odd-numbered array or even-numbered array), the majority element will always 'outweigh' the countering elements over the entire length of the array, even with the smallest majority:
// [m, m, q, p, m ]

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
	let sol = 0,
		cnt = 0;
	// For every element i in the array...
	for (let i = 0; i < nums.length; i++) {
		// If cnt is equal to zero, update sol as sol = nums[i]
		if (cnt == 0) {
			sol = nums[i];
			cnt = 1;
		}
		// If nums[i] is equal to current solution, increment cnt...
		else if (sol == nums[i]) {
			cnt++;
		}
		// Otherwise, decrement cnt...
		else {
			cnt--;
		}
	}
	// Return & print the solution...
	return sol;
};

/***********************************/

// Iterative solution (naive)

// Time complexity =
// Space complexity =

// set base case for n < 3
// while condition 1 or 2  is not met, loop through n elements
// 1. leader element occurs 'majority' times
// 2. leader element occurs as many times as the runnerup plus unvisited elements
// 	update freq map for given element
// 	update leader and runnerup pointers
// return leader element

// 1 2 x x => need to visit 3 total
// 1 2 2 3 x => need to visit 4 total
// 1 2 3 3 3 x x => need to visit 5 total

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
	if (nums.length < 3) return nums[0];

	const majority = Math.floor(nums.length / 2) + 1;
	let map = { [nums[0]]: 1 };
	let p1 = nums[0]; // leader
	let p2 = null; // runner up
	let i = 1;

	while (
		(map[p1] ?? 0) < majority &&
		(map[p1] ?? 0) <= (map[p2] ?? 0) + nums.length - i - 1
	) {
		map[nums[i]] ? map[nums[i]]++ : (map[nums[i]] = 1);

		if (nums[i] !== p1) {
			if (map[nums[i]] > (map[p1] ?? 0)) {
				p2 = p1;
				p1 = nums[i];
			} else {
				if (map[nums[i]] > (map[p2] ?? 0)) {
					p2 = nums[i];
				}
			}
		}
		i++;
	}
	return p1;
};
