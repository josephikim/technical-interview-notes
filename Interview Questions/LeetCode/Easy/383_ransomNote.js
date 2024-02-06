// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

// Each letter in magazine can only be used once in ransomNote.

// Example 1:

// Input: ransomNote = "a", magazine = "b"
// Output: false

// Example 2:

// Input: ransomNote = "aa", magazine = "ab"
// Output: false

// Example 3:

// Input: ransomNote = "aa", magazine = "aab"
// Output: true

// Constraints:

// 1 <= ransomNote.length, magazine.length <= 10^5
// ransomNote and magazine consist of lowercase English letters.

/**********************************

O(n) - Build a frequency map

1. loop through magazine and build char frequency map (could be object keyed by char, or array 0-indexed by unicode char code)
2. loop through ransomNote and decrement corresponding value in frequency map
3. if frequency is not decrementable, return false
4. otherwise return true

O(n^2) - Replace string with reconstructed substring

1. loop through ransomNote. For each char:
2. if not found in magazine, return false
3. else, create new string to replace magazine comprised of two substrings adjacent to matching char

O(n^2) - Use String.replace()

1. loop through ransomNote and replace corresponding char in magazine with '' 
2. if no replacement occurs (ie magazine was unchanged), then searched char did not exist => return false
3. otherwise return true

***********************************/

// Build a frequency map/array

// Time complexity = O(n + m) => O(n);  n = magazine.length, m = ransomNote.length
// Space complexity = O(n)

// loop through magazine and construct a frequency map
// loop through ransomNote and decrement frequency map accordingly

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// var canConstruct = function (ransomNote, magazine) {
// 	let freqMap = {};
// 	for (const ch of magazine) {
// 		freqMap[ch] = freqMap[ch] ? ++freqMap[ch] : 1;
// 	}
// 	for (const ch of ransomNote) {
// 		if (freqMap[ch] == 0 || freqMap[ch] == undefined) return false;
// 		freqMap[ch]--;
// 	}
// 	return true;
// };

// Similar algo but using unicode char code
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// var canConstructUnicode = function(ransomNote, magazine) {
// 	const alpha = new Array(26).fill(0);

// 	for (let i = 0; i < magazine.length; i++) {
// 			alpha[magazine.charCodeAt(i) - 97]++;
// 	}

// 	for (let i = 0; i < ransomNote.length; i++) {
// 			let idx = ransomNote.charCodeAt(i) - 97;
// 			if (!alpha[idx]) return false;
// 			alpha[idx]--;
// 	}
// 	return true;
// };

/***********************************/

// Use String.replace()

// Time complexity = O(m * n) => O(n^2);  n = magazine.length, m = ransomNote.length
// Space complexity = O(1)

// loop through ransomNote and replace corresponding char in magazine with '' (ie remove char from magazine)
// if no replacement occurs (ie magazine was unchanged), then searched char did not exist

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
	for (let i = 0; i < ransomNote.length; i++) {
		let m = magazine.replace(ransomNote[i], "");
		if (m === magazine) {
			return false;
		}
		magazine = m;
	}
	return true;
};

/***********************************/

// Replace string with reconstructed substrings

// Time complexity = O(m * n) => O(n^2);  n = magazine.length, m = ransomNote.length
// Space complexity = O(1)

// loop through ransomNote
// if char is found in magazine, create a new string to replace magazine that excludes the found character

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
	for (let i = 0; i < ransomNote.length; i++) {
		const symbolIndex = magazine.indexOf(ransomNote[i]);
		if (symbolIndex > -1) {
			magazine =
				magazine.substring(0, symbolIndex) +
				magazine.substring(symbolIndex + 1, magazine.length);
		} else {
			return false;
		}
	}
	return true;
};
