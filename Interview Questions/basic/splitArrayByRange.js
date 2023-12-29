// You have an array of random numbers that range from 0 to 100 elements.

// Write a function that will split this array into several arrays, each containing elements in the following range: (0-10],(10-20],(20-30], etc up to a 100].

// Write a function that outputs these arrays in a form of a simple graph, where each delimiter represents a single value in the array.

// Desired output:

// 5  Elements in array: *****  -  1,5,6,3,4
// 3  Elements in array: ***  -  10,12,11
// 2  Elements in array: **  -  22,21
// No Elements in array.
// 2  Elements in array: **  -  45,42
// 3  Elements in array: ***  -  52,51,55
// 2  Elements in array: **  -  64,65
// 1  Elements in array: *  -  71
// No Elements in array.
// 2  Elements in array: **  -  95,99

const array = [
	10, 12, 71, 52, 51, 1, 5, 22, 21, 6, 95, 11, 3, 64, 45, 55, 65, 42, 99, 4,
];

function splitArrayByRange(array) {
	const ranges = Array.from(Array(10), () => []);
	// const ranges = Array(10)
	// 	.fill(null)
	// 	.map((x) => []);
	console.log({ ranges });
	for (var element of array) {
		if (element < 10) {
			ranges[0].push(element);
		} else {
			// get first digit by extracting first regex match for any digit
			const firstMatch = String(element).match(/\d/)[0];
			const digit = Number(firstMatch);
			ranges[digit].push(element);
		}
	}
	for (var range of ranges) {
		if (range.length) {
			console.log(
				`${range.length} Elements in array: ${"*".repeat(
					range.length
				)} ${range.join(",")} \n`
			);
		} else {
			console.log(`No elements in array \n`);
		}
	}
}

splitArrayByRange(array);
