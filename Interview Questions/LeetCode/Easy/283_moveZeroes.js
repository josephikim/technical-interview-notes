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

// Iterative solution (pushing non-zero elements down)

/*
1. init pointers lastNonZeroFound = 0 and loop nums
2. if nums[i] is nonzero, set nums[lastNonZeroFound] to nums[i]
3. increment lastNonZeroFound;
4. loop any element from lastNonZeroFound to nums.length and fill in with 0
*/

// time complexity = O(N)
// space complexity = O(1)

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
	let lastNonZeroFound = 0;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] !== 0) {
			nums[lastNonZeroFound++] = nums[i];
		}
	}
	for (let j = lastNonZeroFound; j < nums.length; j++) {
		nums[j] = 0;
	}
};

/***********************************/

// Iterative solution (using two pointers and swapping)

/*
1. init pointers l = 0 and r = 1 and loop while r < nums.length
2. if nums[l] is zero and nums[r] is nonzero, swap the elements and increment both pointers
3. if nums[l] is nonzero and nums[r] is zero, increment r
4. if nums[l] and nums[r] is zero, increment r
5. if nums[l] and nums[r] is nonzero, increment both
*/

// time complexity = O(N)
// space complexity = O(1)

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
