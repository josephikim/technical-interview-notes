// Given a string s, find the length of the longest
// substring (consisting of consecutive letters) without repeating characters.

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.

// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

// Constraints:

// 0 <= s.length <= 5 * 10^4
// s consists of English letters, digits, symbols and spaces.

/**********************************

O(n) - Use pointer for index of valid substring

1. init substring pointer at 0
2. For each char in string:
3. Check substring from pointer to char position for any matches
4. If match found, update substring pointer
5. Update maxLength based on substring length

O(n^2) - Use array of unicode char codes

1. init substring array and max = 0
2. For each char in string, get char.charCodeAt()
3. Check if char code conflicts with any char code in array
4. If conflict found, splice array up to and including conflicting value
5. Push char code into array and update max based on array.length

***********************************/

// Iterative solution (improved)

// Time complexity = O(n)
// Space complexity = O(n) for subStr array

// Note: conversion of chars to UTF-16 code units is not necessary, assuming the input space only includes characters that can be represented by a single code unit.

// Algorithm
// This strategy updates maxLength without any additional memory space, by simplify looping through s and its substrings directly.

// 1. init substring index 0
// 2. loop through s
// 3. for each element in s, also loop the substring leading up to s
// 4. if current elemnent in s is found in the substring, update the substring's beginning index and break out of the substring loop
// 5. update maxLength if substring length is greater

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	var k = 0; // substring's index
	var maxLength = 0;
	for (i = 0; i < s.length; i++) {
		for (j = k; j < i; j++) {
			if (s[i] === s[j]) {
				k = j + 1;
				break;
			}
		}
		// update max length
		if (i - k + 1 > maxLength) {
			maxLength = i - k + 1;
		}
	}
	return maxLength;
};

/***********************************/

// Iterative solution (naive)

// Time complexity = O(n^2)
// The nested loops is an arithmetic summation (ie (n^2 + n)/2) which can be considered as dominated by n^2
// Space complexity = O(n) for subStr array

// 0. check base case if s.length < 2 return s.length
// 1. init substring array and max = 0
// 2. loop each char in string
// 3. get char.charCodeAt()
// 4. loop through subString with while loop and index i
// 5. if subString[i] equals current char code, splice substring up to and including index i and break while loop
// 6. else if no duplicates found, push char into substring and update max

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	if (s.length < 2) return s.length;
	let subStr = [];
	let max = 0;

	for (const ch of s) {
		let code = ch.charCodeAt();
		let i = 0;
		while (i < subStr.length) {
			if (subStr[i] === code) {
				subStr.splice(0, i + 1); // splice(startIndex, deleteCount)
				break;
			}
			i++;
		}
		subStr.push(code);
		max = Math.max(max, subStr.length);
	}

	return max;
};

let input = "hippo";

console.log(lengthOfLongestSubstring(input));
