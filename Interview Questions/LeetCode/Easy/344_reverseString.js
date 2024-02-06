// Write a function that reverses a string. The input string is given as an array of characters s.

// You must do this by modifying the input array IN-PLACE with O(1) extra memory.

// Example 1:

// Input: s = ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]

// Example 2:

// Input: s = ["H","a","n","n","a","h"]
// Output: ["h","a","n","n","a","H"]

// Constraints:

// 1 <= s.length <= 10^5
// s[i] is a printable ascii character.

/**********************************

O(n) - Two pointers

1. Init two pointers at left and right ends of array
2. while l < r, use a temp variable to store left element, set left to right, set right to temp
3. return reversed string

***********************************/

// Iterative solution - Two pointers

// Time complexity = O(n)
// Space complexity = O(1)

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
	let l = 0,
		r = s.length - 1;
	while (l < r) {
		let temp = s[l];
		s[l] = s[r];
		s[r] = temp;
		l++;
		r--;
	}
	return s;
};
