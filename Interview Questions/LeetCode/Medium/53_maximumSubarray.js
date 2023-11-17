// Given an integer array nums, find the
// subarray with the largest sum, and return its sum.

// NOTE: A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.
// Example 2:

// Input: nums = [1]
// Output: 1
// Explanation: The subarray [1] has the largest sum 1.
// Example 3:

// Input: nums = [5,4,-1,7,8]
// Output: 23
// Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

// Constraints:

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

// Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

/***********************************/

// Iterative solution (optimal)

// Time complexity = O(N)
// Space complexity = O(1)

// use Kadane's algo ie localMax[i] = max(A[i], A[i] + localMax[i-1])
// 1. init localMax = 0, globalMax = Number.NEGATIVE_INFINITY
// 2. loop through array
// 3. for each element, set localMax according to Kadane's algo
// 4. if localMax exceeds globalMax, update globalMax
// 5. return globalMax

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	let localMax = 0;
	let globalMax = Number.NEGATIVE_INFINITY;
	for (i = 0; i < nums.length; i++) {
		localMax = Math.max(nums[i], nums[i] + localMax);
		if (localMax > globalMax) globalMax = localMax;
	}
	return globalMax;
};

// Same logic as above but using ternary expressions:

/**
 * @param {number[]} nums
 * @return {number}
 */
// var maxSubArray = function(nums) {
// 	let maxSum = nums[0];

// 	for (let i=1; i<nums.length; i++) {
// 			nums[i] = nums[i -1] > 0 ? nums[i - 1] + nums[i] : nums[i];
// 			maxSum = nums[i] > maxSum ? nums[i] : maxSum;
// 	}

// 	return maxSum;
// };

/***********************************/

// Recursive solution (divide and conquer + crossing subarray)

// Time complexity = O(nlogn)
// Space complexity = O(logn) = height of a recursion tree of base 2

// divide and conquer (use binary search algo)
// 1. check for base condition nums.length === 1, return nums[0]
// 2. recursively find maxSum of left and right subarrays divided at midpoint of nums
// 3. recursively find maxSum of crossing subarray that spans both left and right subarrays
// 4. return max(left subarray max, right subarray max, crossing subarray max)

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	var maxCrossing = function (arr, l, mid, r) {
		let sum = 0;
		let lMax = Number.NEGATIVE_INFINITY;
		for (let i = mid; i >= l; i--) {
			sum = sum + arr[i];
			if (sum > lMax) lMax = sum;
		}
		sum = 0;
		let rMax = Number.NEGATIVE_INFINITY;
		for (let i = mid + 1; i <= r; i++) {
			sum = sum + arr[i];
			if (sum > rMax) rMax = sum;
		}
		return lMax + rMax;
	};

	var maxRecursive = function (arr, l, r) {
		if (l == r) {
			return arr[l];
		} else {
			let mid = l + Math.floor(r - l) / 2;
			let lMax = maxRecursive(arr, l, mid);
			let rMax = maxRecursive(arr, mid + 1, r);
			let cMax = maxCrossing(arr, l, mid, r);
			return Math.max(lMax, rMax, cMax);
		}
	};

	maxRecursive(nums, 0, nums.length - 1);

	return maxSum;
};

/***********************************/

// Iterative solution (naive)

// Time complexity = O(N)
// Space complexity = O(1)

// 1. check for base condition nums.length === 1, return nums[0]
// 2. initi maxSum and currentSum as nums[0]
// 3. loop nums beginning at second element
// 4. add element to currentSum.
// 5. if currentSum > maxSum, set maxSum to currentSum
// 6. if element > maxSum, set maxSum and currentSum to element
// 7. if element > currentSum, set currentSum to element

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	if (nums.length === 1) return nums[0];
	let maxSum = nums[0];
	let currentSum = nums[0];
	for (i = 1; i < nums.length; i++) {
		currentSum += nums[i];
		if (currentSum > maxSum) {
			maxSum = currentSum;
		}
		if (nums[i] > maxSum) {
			maxSum = nums[i];
			currentSum = maxSum;
		}
		if (nums[i] > currentSum) {
			currentSum = nums[i];
		}
	}
	return maxSum;
};
