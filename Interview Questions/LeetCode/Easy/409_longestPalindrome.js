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

/***********************************/

// Iterative solution (naive)

// Time complexity = O(2N) = O(N)
// Space complexity = O(52) = O(1)

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
			? s.charCodeAt(i) - 65
			: s.charCodeAt(i) - 97 + 26;
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
