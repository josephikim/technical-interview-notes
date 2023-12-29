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

// Take in array of tuples (eg [start, end]), and outputs array of tuples representing all gaps found (eg [startGap, endGap])
// If no event starts at time 0, there is a gap
// If no event ends at time 1440, there is a gap

// Loop through tuples, check end time of tuple 1 against start time of tuple 2
// Also check for gap in start of first tuple and end of last tuple
// Construct array of tuples [gapStart, gapEnd]

const findGaps = (inputArr) => {
	const result = [];
	const sorted = inputArr.sort((a, b) => a[0] - b[0]);

	sorted.forEach(function ([start, end], i) {
		// check if end of current tuple is < start of next tuple
		// if true, create new tuple with start being end of current tuple, and end being start of next tuple and push into result array

		if (i < sorted.length - 1) {
			// don't process last tuple
			const isGap = end < sorted[i + 1][0];

			if (isGap) {
				const tuple = [end, sorted[i + 1][0]];
				result.push(tuple);
			}
		}
	});

	return result;
};

// const input = [
// 	[0, 200],
// 	[600, 1440],
// 	[200, 400],
// ];
// const input = [
// 	[0, 200],
// 	[600, 1440],
// 	[201, 400],
// ];
// const input = [
// 	[0, 200],
// 	[600, 1440],
// 	[199, 400],
// ];
// const input = [
// 	[0, 200],
// 	[600, 1440],
// 	[200, 600],
// ];
const input = [
	[0, 0],
	[1, 200],
	[600, 1439],
	[200, 600],
	[1440, 1440],
];

console.log(findGaps(input));
