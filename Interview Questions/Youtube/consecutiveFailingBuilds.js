// Video link: https://www.youtube.com/watch?v=rw4s4M3hFfs

// You are an engineer monitoring the build status of an application and how long it takes to transition from a failed build back to a passing build. The data is a list composed of build runs consisting of statuses marked by a boolean (true for passing, false for failing). Each run starts with a passing status (ie 'true') and ends with the last failing status ('false') before transitioning back to a passing status.

// Note: Each time the build transitions from failed to passing, a new list is started.

// The percentage of time in each run that the build was passing is called the 'green percentage'. E.g. the green percentage of the first run is 60%.

let runs = [
	[true, true, true, false, false],
	[true, true, true, true, true, true, false, false],
	[true, true, true, false, false],
	[true, true, true, false, false, false, false, false],
	[true, false, false, false],
	[true, true, true, true, true, true, true, true, true, true, false, false],
	[true, true, true, true, true, true, false, false, false],
	[true, true, true, true, true, false, false, false, false],
	[true, true, false, false],
	[true, true, true, false, false, false, false, false, false],
];

// Your goal is to find the greatest number of runs with a stricly decreasing green percentage.

// Contraints
// There will be a minimum of 2 runs
// The length of each run can differ
// There will be a status recorded for every time period (no time period is skipped)
// Each run will only have one transition from true to false
// Every run starts with true and ends with false, so min length of each run is 2

/***********************************/

// Iterative solution

// Time complexity = O(nlogm)  with n = runs.length, m = length of longest run
// Space complexity = O(1)

// 0. init prevPct as greenPct at runs[0], i = 1, and variables for result and localMax
// 1. Loop through runs starting at index i
// 2. calculate the green percentage at runs[i]. If less than prev pct, increment localMax, otherwise reset localMax to 0
// 3. Update result based on localMax, set prev pct to curr pct, and increment i
// 4. repeat steps 2 - 3
// 5. return result variable

var maxDecreasingGreenPercentageRuns = function (runs) {
	let result = 0;
	let localMax = 0;
	let prevPct = getGreenPct(runs[0]);
	let i = 1;

	// loop through runs
	while (i < runs.length) {
		let currPct = getGreenPct(runs[i]);

		if (currPct < prevPct) {
			localMax++;
		} else {
			localMax = 0;
		}

		result = Math.max(result, localMax);
		prevPct = currPct;
		i++;
	}
	return result;
};

var getGreenPct = function (run) {
	let l = 0;
	let r = run.length - 1;
	let boundary = -1;

	// get index of first false value
	// uses binary search algo ie O(logn)
	while (l <= r) {
		let mid = Math.floor((l + r) / 2);
		if (run[mid] === true) {
			l = mid + 1;
		} else {
			boundary = mid;
			r = mid - 1;
		}
	}

	return Math.round((boundary / run.length) * 100) / 100;
};

console.log(maxDecreasingGreenPercentageRuns(runs));
