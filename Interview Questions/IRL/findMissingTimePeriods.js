// Missing Time Periods (Finding Gaps)

// You are given a list of time periods where a time period is represented as [startTimeInMinutes, endTimeInMinutes]. The goal is to find all the time period(s) that are missing in the 24 hour(0 - 1440 minutes) range.

// Constraints:

// 0 <= startTimeInMinutes <= 1440
// 0 <= endTimeInMinutes <= 1440
// startTimeInMinutes <= endTimeInMinutes

// Example 1:
// 	input: [[0, 200],[600,1440],[200,400]]
//  sorted: [[0, 200],[200,400],[600,1440]]
// 	output: [[400, 600]]

// Example 2:
//   input: [[0, 200],[201,1440]]
//   output: [[200, 201]]

// Example 3:
//   input: [[0, 200],[199,1440]]
//   output: []

// Take in array of tuples [start, end], outputs array of tuples [startGap, endGap]
// If no event starts at time 0, there is a gap
// If no event ends at time 1440, there is a gap

// Loop through tuples, check end time of tuple 1 against start time of tuple 2
// Also check for gap in start of first tuple and end of last tuple
// Construct array of tuples [gapStart, gapEnd]

const input = [
	[0, 200],
	[600, 1440],
	[200, 400],
];
const input2 = [
	[0, 200],
	[600, 1440],
	[201, 400],
];
const input3 = [
	[0, 200],
	[600, 1440],
	[199, 400],
];
const input4 = [
	[0, 200],
	[600, 1440],
	[200, 600],
];
const input5 = [
	[0, 0],
	[1, 200],
	[600, 1439],
	[200, 600],
	[1440, 1440],
];

const findGaps = (inputArr) => {
	let gaps = [];
	const sorted = inputArr.sort((a, b) => a[0] - b[0]);
	console.log("sorted", sorted);
	// for (const ([start, end], i) in events) {
	sorted.forEach(function ([start, end], i) {
		// check if end of current tuple is < start of next tuple
		// if true, create new tuple with start being end of current tuple, and end being start of next tuple
		// push into gaps array

		// console.log('element', sorted[i])
		// console.log('i', i)

		if (i == sorted.length - 1) return;
		const isGap = end < sorted[i + 1][0];

		if (isGap) {
			const gap = [end, sorted[i + 1][0]];
			gaps.push(gap);
		}
	});
	// console.log('gaps', gaps)
	return gaps;
};

const result = findGaps(input5);
console.log("result", result);

// class GapFinder {
//   constructor(inputArr) {
//     this.events = this.sortInput(inputArr)
//   }

//   // Injects dummy tuples at beginning and end of array
//   sortInput(input) {
//     return input.sort((a, b) => b[0] - a[0])
//   }

//   // findGaps(events) {
//   //   for (const ([start, end], i) in events) {

//   //   }
//   // }
// }

// const test = new GapFinder(input)

// // const sorted = test.sortInput();
// // console.log('test.events', test.events)
