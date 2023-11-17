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

// Iterative solution (naive)

// Time complexity =
// Space complexity =

// 1. find idx where new interval will be inserted (idx where a free space exists or where interval(s) will be replaced)
// 2. if interval(s) need replacing, calc which intervals affected and what the replacement interval will be
// 3. replace new interal where affected intervals were originally
// 4. return updated array

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
	let insertionIdx = 0;

	var merge = function (arr, interval, idx) {
		return [
			Math.min(arr[idx][0], interval[0]),
			Math.max(arr[idx][1], interval[1]),
		];
	};

	while (
		insertionIdx < intervals.length &&
		intervals[insertionIdx][1] < newInterval[0]
	) {
		insertionIdx++;
	}

	if (insertionIdx >= intervals.length) {
		// insert at end of intervals
		intervals.push(newInterval);
	} else if (newInterval[1] < intervals[insertionIdx][0]) {
		// insert at free space in intervals
		intervals.splice(insertionIdx, 0, newInterval);
	} else {
		// insert after merging
		let merged = merge(intervals, newInterval, insertionIdx);
		let mergedCount = 1;
		while (
			intervals[insertionIdx + mergedCount] &&
			merged[1] >= intervals[insertionIdx + mergedCount][0]
		) {
			merged = merge(intervals, merged, insertionIdx + mergedCount);
			mergedCount++;
		}
		intervals.splice(insertionIdx, mergedCount, merged);
	}
	return intervals;
};
