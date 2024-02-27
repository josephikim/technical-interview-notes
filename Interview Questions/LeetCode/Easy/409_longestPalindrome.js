// Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

// Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

// Example 1:

// Input: s = "abccccdd"
// Output: 7
// Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.

// Example 2:

// Input: s = "a"
// Output: 1
// Explanation: The longest palindrome that can be built is "a", whose length is 1.

// Constraints:

// 1 <= s.length <= 2000
// s consists of lowercase and/or uppercase English letters only.

/**********************************

O(n) - Use Frequency Set()

1. init frequency Set() and maxPalindromeLength = 0;
2. loop through s, search for char in Set
3. If not found, push into Set
4. If found, add 2 to maxPalindromeLength, and delete the that char from Set, 
5. After looping, add 1 to maxPalindromeLength if any elements remain in Set (ie set.size is true) 

O(n) - Use Frequency map 0-indexed by unicode char code

1. init freq array length 52 (Uppercase and lowercase letters)
2. loop through string and fill up freq array based on unicode char codes
3. loop through freq array and calculate total length of max palindrome

***********************************/

// Iterative solution (using Set)

// Time complexity = O(2N) = O(N)
// Space complexity = O(52) = O(1)

// NOTE: only one instance of a non-paired char is allowed in total length of result string.

// init freq Set()
// loop through s, push elements into Set
// when a pair of a given character is found, delete the odd instance of that char from Set, then add 2 to length to signify that a pair has been found
// after looping, if there are any remaining odd instances in Set (ie set.size is true), add 1 to length

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
	const pairs = new Set();
	let length = 0;

	for (let i = 0; i < s.length; i++) {
		if (pairs.has(s[i])) {
			// even number instance of given char has been found
			pairs.delete(s[i]);
			// we add 2 to length because a pair has been found
			length += 2;
		} else {
			// note odd number instance of given char
			pairs.add(s[i]);
		}
	}

	// if any leftover odd number instances in set, we add 1 (only 1 odd instance is allowed in a palindrome)
	if (pairs.size) {
		length++;
	}

	return length;
};

// Same logic as above but using object instead of Set

// /**
//  * @param {string} s
//  * @return {number}
//  */
// var longestPalindrome = function (s) {
// 	let length = 0;
// 	let obj = {};

// 	for (let char of s) {
// 		obj[char] = obj[char] ? obj[char] + 1 : 1;
// 		if (obj[char] % 2 === 0) {
// 			length += 2;
// 		}
// 	}
// 	return s.length > length ? length + 1 : length;
// };

/***********************************/

// Iterative solution (naive)

// Time complexity = O(2N) = O(N)
// Space complexity = O(52) = O(1)

// init freq array length 52
// loop through s and fill up freq array
// loop through freq array and add up entries if even integer
// allow max one odd number entry

/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
	if (s.length === 1) return 1;

	// function to check if char is lowercase
	var isLowerCase = function (str) {
		return str === str.toLowerCase() && str !== str.toUpperCase();
	};

	// init freq array
	const alpha = new Array(52).fill(0);

	// fill up freq array using UTF-16 code points
	for (let i = 0; i < s.length; i++) {
		let idx = !isLowerCase(s[i])
			? s.charCodeAt(i) - 65 // normalize uppercase letters (unicode 65 for 'A')
			: s.charCodeAt(i) - 97 + 26; // normalize lowercase letters (unicode 97 for 'a', add 26 to account for uppercase letters in freq array)
		alpha[idx]++;
	}

	// in freq array, sum the even portions of pos integer entries
	// allow max one odd number entry
	let length = 0;
	alpha.map((entry) => {
		if (entry === 0) return;

		if (length === 0) {
			length += entry;
		} else {
			if (length % 2 === 0) {
				length += entry;
			} else {
				length += 2 * Math.floor(entry / 2);
			}
		}
	});
	return length;
};
