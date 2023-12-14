// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:

// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:

// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

// Constraints:

// 1 <= s.length <= 2 * 105
// s consists only of printable ASCII characters.

/***********************************/

// Optimal solution
// Time complexity = O(n)
// Space complexity = O(1)
//
// set string to lowercase, then remove non-alphanumerics
// form array of characters from resulting string (using array.split(''))
// reverse the array
// reconstruct string using array.join('')
// compare original string with reversed

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
	s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
	let reverse = s.split("").reverse().join("");
	return reverse === s;
};

// Naive solution
// same as above, but using array spread operator instead of str.split()
// /**
//  * @param {string} s
//  * @return {boolean}
//  */
// var isPalindrome = function(s) {
// 	if (s.length < 2) return true

// 	let clean = s.replace(/[^0-9A-Z]+/gi,"").toLowerCase()
// 	let reversed = [...clean].reverse().join('')
// 	if(clean === reversed) return true
// 	return false
// };
