/*
Write a function that accepts a String as an argumnent.

The String is supposed to be HTML. But all the div elements are missing their closing tags (they have the < and >). Just the '/' of the closing tags is missing.

The function needs to find and close all the divs in the provided HTML string.

The function should return the entire corrected string.

constraints:
-other HTML tags are propertly closed
-All div tags need a closing tag, regardless of whether the opening tag is part of the content inside a <p> tag for example
-nesting should not affect the result: any opening div must be closed before the next opening div
-there may or may not be spaces between each word and/or html tag (e.g. '<div><div><div>')
-there may or may not be an even number of total div tags
*/

// Iterative - str.split("<div>")
// Time complexity: O(n)
// Space complexity: O(n)

const closeDivs = (input) => {
	let substrings = input.split("<div>");

	let res = "";
	for (let i = 0; i < substrings.length; i++) {
		res += substrings[i];
		if (i < substrings.length - 1) {
			res += i % 2 === 0 ? "<div>" : "</div>";
		}
	}
	return res;
};

// let html = "<div><p> Here is a <div> tag </p>";
// let html = "<div><div><div>";
let html = "<div><div><p>Hello</p><div><div>";
// console.log(closeDivs(html));

// Optimized - regex
// Time complexity: O(n)
// searching a substring inside a string can be done in linear time using KMP algorithm which is the most efficient. Replacing in the worst case will take linear time as well.
const closeDivsRegex = (input) => {
	// Note: in the callback for regex replace function, the first parameter will contain the found string, the second parameter - the first capturing group, the third parameter - the second capturing group, and so on - you can pass as many parameters as there are capturing groups in the regular expression.
	let t = 0;
	return input.replace(/<div>/g, (match) => (++t % 2 === 0 ? "</div>" : match));
};

console.log(closeDivsRegex(html));
