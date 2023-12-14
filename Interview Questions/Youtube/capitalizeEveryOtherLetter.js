/*

Youtube: https://www.youtube.com/watch?v=t3qZR6Qjy-c

Write a function that accepts a String as an argument. The function should capitalize ONLY every other letter in the String.

The function should then return the converted String.

Contraints: 
-empty string is possible
-all characters consists of lowercase letters, spaces, numbers or special characters
-start capitalizing at first letter

Example:
"hello" => "HeLlO"
"yo eli" => "Yo eLi"
"hello???" => "HeLlO???"

*/

// Brute force - iterative
// Time complexity: O(n)
// str.charAt() has complexity O(1)
const capitalizeAltLetters = (input) => {
	let res = "";
	for (let i = 0; i < input.length; i++) {
		res += i % 2 == 0 ? input.charAt(i).toUpperCase() : input.charAt(i);
	}
	return res;
};

// Optimized - regex
// Time complexity: O(n)
// searching a substring inside a string can be done in linear time using KMP algorithm which is the most efficient. Replacing in the worst case will take linear time as well.
const capitalizeAltLettersRegex = (input) => {
	// Note: in the callback for regex replace function, the first parameter will contain the found string, the second parameter - the first capturing group, the third parameter - the second capturing group, and so on - you can pass as many parameters as there are capturing groups in the regular expression.
	return input.replace(/.{2}/g, function (match, $1, $2, offset, original) {
		return "" + match[0].toUpperCase() + match[1];
	});
};

console.log(capitalizeAltLetters("hello"));
console.log(capitalizeAltLetters("hello???"));
console.log(capitalizeAltLetters("yo eli"));

console.log(capitalizeAltLettersRegex("hello"));
console.log(capitalizeAltLettersRegex("hello???"));
console.log(capitalizeAltLettersRegex("yo eli"));
