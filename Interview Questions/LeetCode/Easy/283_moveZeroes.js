// Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// Note 1: The non-zero elements may be in any particular order. This must be maintained except for the zeroes.

// Note 2: You must do this in-place without making a copy of the array.

// Example 1:

// Input: nums = [0,1,0,3,12]
// Output: [1,3,12,0,0]
// Example 2:

// Input: nums = [0]
// Output: [0]

// Constraints:

// 1 <= nums.length <= 10^4
// -2^31 <= nums[i] <= 2^31 - 1

// Follow up: Could you minimize the total number of operations done?

/***********************************/

// Iterative solution (using two pointers)

/*
1. init pointers l = 0 and r = 1 and loop while r < nums.length
2. if nums[l] is zero and nums[r] is nonzero, swap the elements and increment both pointers
3. if nums[l] is nonzero and nums[r] is zero, increment r
4. if nums[l] and nums[r] is zero, increment r
5. if nums[l] and nums[r] is nonzero, increment both
*/

// time complexity =
// space complexity =

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
	let l = 0;
	let r = 1;
	while (r < nums.length) {
		if (nums[l] === 0) {
			if (nums[r] !== 0) {
				nums[l] = nums[r];
				nums[r] = 0;
				l++;
			}
			r++;
		} else {
			l++;
			r++;
		}
	}
};
