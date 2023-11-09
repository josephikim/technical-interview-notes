// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false

// Constraints:

// 1 <= s.length, t.length <= 5 * 104
// s and t consist of lowercase English letters.

// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

/***********************************/

// Optimal solution using UNICODE CODE POINTS

// Time complexity = O(n) ie s.length
// Space complexity = O(1) ie array of length 26
//
// use a frequency map - in this case an array since it conveniently uses 0-based index
// similarly we will convert each character's unicode unit to a 0-based index by subtracting 'a'.charCodeAt(0)

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isAnagramUnicode = function (s, t) {
	if (s.length !== t.length) {
		return false;
	}

	var freq = new Array(26).fill(0);

	for (var i = 0; i < s.length; i++) {
		freq[s.charCodeAt(i) - "a".charCodeAt(0)]++;
		freq[t.charCodeAt(i) - "a".charCodeAt(0)]--;
	}

	// freq arr should be all zeroes if a true anagram was provided
	for (var i = 0; i < freq.length; i++) {
		if (freq[i] !== 0) {
			return false;
		}
	}

	return true;
};

/***********************************/

// Optimal solution using frequency map(s) of characters

// Time complexity = s.length + t.length = 2 X s.length = O(2n) = O(n)
// Space complexity = O(n) worst case ie 2 freq maps of same length as s.length
//
// create two freq maps, for s and t
// compare if the two freq maps are equal

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
	if (s.length !== t.length) return false;
	const freqS = getFreqMap(s);
	const freqT = getFreqMap(t);
	for (const letter in freqS) {
		if (freqS[letter] !== freqT[letter]) return false;
	}
	return true;
};
const getFreqMap = (str) =>
	[...str].reduce((acc, item) => {
		acc[item] = (acc[item] ?? 0) + 1;
		return acc;
	}, {});

/***********************************/

// Naive solution
// Time complexity = O(nlog(n)) for most common sorting algos
// Space complexity = O(n)
//
// create two freq maps, for s and t
// compare if the two freq maps are equal

// var isAnagram = function(s, t) {
//     const sortedS = [...s].sort()
//     const sortedT = [...t].sort()
//
//     return sortedS.toString() === sortedT.toString() OR
//
//     return arrayIsSame(sortedS, sortedT)
// };
// const arrayIsSame = (arr1, arr2) => {
//    return arr1.length == arr2.length &&
// 						arr1.every(function(element, i) {
//        			return element === arr2[i]
//    				})
// }
