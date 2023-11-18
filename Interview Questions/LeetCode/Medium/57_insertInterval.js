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
