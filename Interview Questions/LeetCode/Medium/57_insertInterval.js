// You are given an array of non-overlapping intervals where intervals[i] = [startI, endI] represent the start and the end of the ith interval and intervals is sorted in ascending order by startI. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by startI and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.

// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

// Constraints:

// 0 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= startI <= endI <= 105
// intervals is sorted by startI in ascending order.
// newInterval.length == 2
// 0 <= start <= end <= 105

/***********************************/

// Iterative solution (improved)

// Time complexity = O(N)
// Space complexity = O(1) not counting result array

// 1. set result array as [], i = 0
// 2. loop through intervals, pushing non overlapping elements into result
// 3. once overlap is hit, modify newInterval by merging with overlapping element, repeat until newInterval no longer overlaps
// 4. pushing remaining elements into result array

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

const insert = (intervals, newInterval) => {
	let start = 0;
	let end = 1;
	let track = [];
	let i = 0;

	while (i < intervals.length && intervals[i][end] < newInterval[start]) {
		track.push(intervals[i]);
		i++;
	}

	while (i < intervals.length && intervals[i][start] <= newInterval[end]) {
		// it overlaps if the end is greater than the start
		newInterval[start] = Math.min(intervals[i][start], newInterval[start]);
		newInterval[end] = Math.max(intervals[i][end], newInterval[end]);
		i++;
	}

	track.push(newInterval);

	while (i < intervals.length) {
		track.push(intervals[i]);
		i++;
	}

	return track;
};

// same logic as above but with one for...of loop

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// var insert = function(intervals, newInterval) {
// 	let l = [];
// 	let r = [];
// 	for (let interval of intervals) {
// 			let [s, e] = interval;
// 			let [ns, ne] = newInterval;
// 			if (e < ns) {
// 					l.push(interval)
// 			} else if (ne < s) {
// 					r.push(interval)
// 			} else {
// 					newInterval = [Math.min(s, ns), Math.max(e, ne)]
// 			}
// 	}
// 	return [...l, newInterval, ...r]
// };

// same logic as above but add elements after merge as a slice

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// var insert = function(intervals, newInterval) {
// 	if(!intervals || !intervals.length) return [newInterval];

// 	const result = [];
// 	let i = 0;

// 	while(i < intervals.length && newInterval[0] > intervals[i][1]){
// 			result.push(intervals[i++])
// 	}

// 	while(i < intervals.length && newInterval[1] >= intervals[i][0]){
// 			newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
// 			newInterval[1] = Math.max(newInterval[1], intervals[i][1])
// 			i += 1;
// 	}

// 	result.push(newInterval, ...intervals.slice(i));

// 	return result;
// };

/***********************************/

// Iterative solution (naive)

// Time complexity = O(N)
// Space complexity = O(1)

// 1. set base case (intervals.length === 0) return [newInterval];
// 2. init l and r = 0, inserted flag = false
// 3. create functions for check overlap(arr1, arr2) and merge(arr1, arr2)
// 4. loop while inserted = false
// 5. if no overlap at position l, slide window right 1 position
// 6. if free space exists at l or at end of intervals, splice or push accordingly and set inserted = true
// 7. if overlap found, merge newInterval with intervals[l]
// 8. loop through remaining intervals while intervals[l] and intervals[r] overlap, merging them together and splicing into intervals[l]
// 9. set inserted = true
// 10. return updated intervals

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// same logic as above but with sliding window
var insert = function (intervals, newInterval) {
	if (intervals.length === 0) return [newInterval];
	let l = 0;
	let r = 1;
	let inserted = false;

	var overlaps = function (arr1, arr2) {
		return (
			(arr1[0] <= arr2[1] && arr1[0] >= arr2[0]) ||
			(arr2[0] <= arr1[1] && arr2[0] >= arr1[0])
		);
	};

	var merge = function (arr1, arr2) {
		return [Math.min(arr1[0], arr2[0]), Math.max(arr1[1], arr2[1])];
	};

	while (!inserted) {
		if (overlaps(newInterval, intervals[l])) {
			// merge at overlap
			intervals[l] = merge(intervals[l], newInterval);
			while (intervals[r] && overlaps(intervals[l], intervals[r])) {
				intervals.splice(l, 2, merge(intervals[l], intervals[r]));
			}
			inserted = true;
		} else {
			if (newInterval[0] < intervals[l][0]) {
				// free space at position l
				intervals.splice(l, 0, newInterval);
				inserted = true;
			} else {
				if (!intervals[r]) {
					// finished looping
					intervals.push(newInterval);
					inserted = true;
				}
			}
			l = r;
			r++;
		}
	}
	return intervals;
};
