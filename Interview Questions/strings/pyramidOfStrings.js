// Read in a text file containing lines consisting of a number and a word.
// Print out a string consisting of the words corresponding to the numbers at the end of each line of a pyramid ordered from smallest to biggest using the triangular sequence. IE:
// 1
// 2 3
// 4 5 6

// So the output shoudl contain the words corresponding to numbers 1, 3, 6, etc. Any word corresponding to a number that isn't at the end of a pyramid line should be ignored

/*----------------------*/

// This async function uses the readline library to read an input text file line by line. It loops through each line, splits each line into substrings and uses their values to update the wordMap object. After that, it uses a while loop to build the result string by calculating consecutive values of the triangular numbers sequence (nTriangle) and using that value as the object key to access the corresponding word in wordMap.

import fs from "fs";
import { once } from "events";
import readline from "readline";
let message_file = "./pyramidText.txt";

const decode = async (message_file) => {
	const wordMap = {};

	try {
		const rl = readline.createInterface({
			input: fs.createReadStream(message_file),
			crlfDelay: Infinity,
		});

		rl.on("line", (line) => {
			if (line.length > 0) {
				const subStrings = line.split(" ");
				wordMap[subStrings[0]] = subStrings[1];
			}
		});

		await once(rl, "close");
	} catch (err) {
		console.error(err);
	}

	let result = "";
	let n = 1;
	let nTriangle = 1;
	while (wordMap[nTriangle] !== undefined) {
		result += nTriangle === 1 ? wordMap[nTriangle] : ` ${wordMap[nTriangle]}`;
		n++;
		nTriangle = (n * (n + 1)) / 2;
	}

	return result;
};

// Generic "build pyramid" functions

// print consecutive integers
function generatePyramid() {
	var totalNumberofRows = 5;
	var output = "";
	for (var i = 1; i <= totalNumberofRows; i++) {
		for (var j = 1; j <= i; j++) {
			output += j + "  ";
		}
		console.log(output);
		output = "";
	}
}

// print variable number of stars
function pyramid(n) {
	for (let i = 1; i <= n; i++) {
		let str = " ".repeat(n - i);
		let str2 = "*".repeat(i * 2 - 1);
		console.log(str + str2 + str);
	}
}

// print all stars
function createPyramid(rows) {
	for (let i = 0; i < rows; i++) {
		var output = "";
		for (let j = 0; j < rows - i; j++) output += " ";
		for (let k = 0; k <= i; k++) output += "* ";
		console.log(output);
	}
}
