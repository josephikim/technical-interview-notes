// Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.

// Example 1:

// Input: nums = [-4,-1,0,3,10]
// Output: [0,1,9,16,100]
// Explanation: After squaring, the array becomes [16,1,0,9,100].
// After sorting, it becomes [0,1,9,16,100].

// Example 2:

// Input: nums = [-7,-3,2,3,11]
// Output: [4,9,9,49,121]

// Constraints:

// 1 <= nums.length <= 10^4
// -10^4 <= nums[i] <= 10^4
// nums is sorted in non-decreasing order.

// Follow up: Squaring each element and sorting the new array is very trivial, could you find an O(n) solution using a different approach?

/***********************************/

// Iterative solution (optimal O(n))

/*
1. init result array and two pointers l = 0, r = nums.length
2. fill in result array with nums elements in decreasing order of absolute value e.g. [10, -4, 3, -1, 0]
3. increment/decrement pointers accordingly
4. return arr reversed and squared
*/

// time complexity = O(n)
// space complexity = O(n)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
	let arr = [],
		l = 0,
		r = nums.length - 1;

	while (l <= r) {
		if (Math.abs(nums[l]) <= Math.abs(nums[r])) {
			arr.push(nums[r]);
			r--;
		} else {
			arr.push(nums[l]);
			l++;
		}
	}

	return arr.reverse().map((n) => n * n);
};

// Similar logic using arr.unshift()
// var sortedSquares = function(nums) {
//   let l = 0, r = nums.length - 1;
//   const res = [];
//   while (l <= r) {
//       let left = nums[l] * nums[l],
//           right = nums[r] * nums[r];
//       if (right > left) {
//           res.unshift(right);
//           r--;
//       } else {
//           res.unshift(left);
//           l++;
//       }
//   }
//   return res;
// };

/***********************************/

// Iterative solution (suboptimal O(n))

/*
1. init result array and two pointers l = 0, r = nums.length
2. increment/decrement pointers until the point that divides negative and positive numbers
3. radiate out from that point and fill in result array while decrementing/incrementing pointers
*/

// time complexity = O(n)
// space complexity = O(n)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
	let l = 0,
		r = nums.length - 1;
	const res = [];

	if (nums[l] <= 0 && nums[r] <= 0) {
		// all negatives
		while (r >= l) {
			res.push(nums[r] ** 2);
			r--;
		}
	} else if (nums[l] >= 0 && nums[r] >= 0) {
		// all positives
		while (l <= r) {
			res.push(nums[l] ** 2);
			l++;
		}
	} else {
		// find pos/neg boundary
		while (r - l > 1) {
			if (nums[l + 1] <= 0) {
				l++;
			}
			if (nums[r - 1] > 0) {
				r--;
			}
		}
		// radiate out and fill in results
		while (nums[l] || nums[r]) {
			if (nums[l] == undefined) {
				res.push(nums[r] ** 2);
				r++;
			} else if (nums[r] == undefined) {
				res.push(nums[l] ** 2);
				l--;
			} else {
				if (Math.abs(nums[l]) <= Math.abs(nums[r])) {
					res.push(nums[l] ** 2);
					l--;
				} else {
					res.push(nums[r] ** 2);
					r++;
				}
			}
		}
	}
	return res;
};

/***********************************/

// Iterative solution (brute force)

/*
1. Square each element
2. sort the resulting array
*/

// time complexity = O(nlogn)
// space complexity = O(1)

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
	nums.forEach((num, index, arr) => {
		arr[index] = num ** 2;
	});
	nums.sort((a, b) => a - b);
	return nums;
};
