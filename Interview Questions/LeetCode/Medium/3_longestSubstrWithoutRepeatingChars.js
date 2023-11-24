// Given a string s, find the length of the longest
// substring without repeating characters.

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

// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

/***********************************/

// Iterative solution (improved)

// Time complexity =
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
		if (i - k + 1 > maxLength) {
			maxLength = i - k + 1;
		}
	}
	return maxLength;
};

/***********************************/

// Iterative solution (naive)

// Time complexity = O(n) => n = s.length
// Note: Complexity is not O(n^2) bc inner while loop does not loop through n elements for every character in s.
// Instead, there is an additional constant amount for work for each n so its actually O(n) + sigma summation of n (ie (n^2 + n)/2) which is a constant number, thus overall complexity is O(n)
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
				subStr.splice(0, i + 1);
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
