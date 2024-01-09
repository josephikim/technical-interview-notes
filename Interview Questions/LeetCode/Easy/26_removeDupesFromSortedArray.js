// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// 1. Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.

// 2. Return k.

// Use the following code to test your solution:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

// Example 1:

// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:

// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Constraints:

// 1 <= nums.length <= 3 * 104
// -100 <= nums[i] <= 100
// nums is sorted in non-decreasing order.

/***********************************/

// Iterative solution (optimal)
// NOTE: Sort of a trick question bc you might think you need to insert underscores. If you read closely, you just need to modify nums up to index k - 1, (and also return k)

/* Algorithm
1. Don't use any array methods other than looping
2. init k = 1
3. loop through nums
4. if current element is greater than previous element, set nums[k] as current element and increment k
5. return k (nums will also have been modified by this point up to nums[k-1] ie nums might end up as [1,2,3,4,2,2,2,3,3,3,4])

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	let k = 1;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > nums[i - 1]) {
			nums[k] = nums[i];
			k++;
		}
	}
	return k;
};

/***********************************/

// Iterative solution

/* Algorithm
1. Init index pointer
2. Loop nums using while loop
3. If current element is greater than prev element, remove current element using splice
4. else, increment index
5. if index is equal or greater than nums.length, exit loop
6. return updated nums.length

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	let i = 1;
	while (i < nums.length) {
		if (nums[i] === nums[i - 1]) {
			nums.splice(i, 1);
		} else {
			i++;
		}
	}
	return nums.length;
};

// let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let nums = [1, 2];

console.log(removeDuplicates(nums));
