// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

// Merge nums1 and nums2 into a single array sorted in non-decreasing order.

// The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

// Example 1:

// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// Output: [1,2,2,3,5,6]
// Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
// The result of the merge is [1*,2*,2,3*,5,6] with the starred elements coming from nums1.

// Example 2:

// Input: nums1 = [1], m = 1, nums2 = [], n = 0
// Output: [1]
// Explanation: The arrays we are merging are [1] and [].
// The result of the merge is [1].

// Example 3:

// Input: nums1 = [0], m = 0, nums2 = [1], n = 1
// Output: [1]
// Explanation: The arrays we are merging are [] and [1].
// The result of the merge is [1].
// Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.

// Constraints:

// nums1.length == m + n
// nums2.length == n
// 0 <= m, n <= 200
// 1 <= m + n <= 200
// -10^9 <= nums1[i], nums2[j] <= 10^9

// Follow up: Can you come up with an algorithm that runs in O(m + n) time?

/**********************************

O(n * m) - Iterative, in place, backwards (hi to lo)

1. Init pointer as 'last' index position of new merged list (m + n - 1)
2. Loop nums1 and nums2 backwards using m and n as pointers.
3. Compare values, update nums1[last] with greater value, decrement m or n and last.
4. After looping, if elements remain in nums2, merge them into nums1

O(n * m) - Iterative, create new Array

1. Init result array = []
2. loop through nums1 and nums2 using two 0-indexed pointers
3. compare elements, push smaller into result, increment corresponsing pointer.
4. Once nums1 or nums2 has finished, push elements of remainig array into result.
5. set result as nums1. return nums1

***********************************/

// Iterative solution (optimized space)

// time complexity = O(m + n)
// space complexity = O(1)

// Avoid creating a new result array, so that we save on memory space
// 1. Init pointer as last index position of new merged list (m + n - 1)
// 2. Compare last set of real values (ie nums1[m-1] and nums2[n-1])
// 3. Update nums1[last] with greater value and decrement m or n
// 4. decrement last
// 5. If elements remain in nums2, merge them into nums2 in order

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
	let last = m + n - 1;
	while (m > 0 && n > 0) {
		if (nums1[m - 1] > nums2[n - 1]) {
			nums1[last] = nums1[m - 1];
			m--;
		} else {
			nums1[last] = nums2[n - 1];
			n--;
		}
		last--;
	}
	while (n > 0) {
		nums1[last] = nums2[n - 1];
		n--;
		last--;
	}
	// don't need to handle case of (m > 0) because m represents indices in nums1, which is the array we want to modify only until all elements from nums2 (indicated by index n) has been incorporated.
};

/***********************************/

// Iterative solution (brute force)

// time complexity = O(m + n)
// space complexity = O(m + n)

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
	let res = [];
	let i = 0,
		j = 0;
	while (i <= m && j <= n) {
		if (nums1[i] <= nums2[j]) {
			res.push(nums1[i]);
			i++;
		} else {
			res.push(nums2[j]);
			j++;
		}
	}

	while (i <= m) {
		res.push(nums1[i]);
		i++;
	}
	while (j <= n) {
		res.push(nums2[j]);
		j++;
	}

	nums1 = [...res];
};
