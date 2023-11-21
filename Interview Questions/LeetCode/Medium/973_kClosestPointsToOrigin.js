// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

// The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

// You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

// Example 1:

// Input: points = [[1,3],[-2,2]], k = 1
// Output: [[-2,2]]
// Explanation:
// The distance between (1, 3) and the origin is sqrt(10).
// The distance between (-2, 2) and the origin is sqrt(8).
// Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
// We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

// Example 2:

// Input: points = [[3,3],[5,-1],[-2,4]], k = 2
// Output: [[3,3],[-2,4]]
// Explanation: The answer [[-2,4],[3,3]] would also be accepted.

// Constraints:

// 1 <= k <= points.length <= 104
// -104 <= xi, yi <= 104

/***********************************/

// Iterative solution (naive)

// Time complexity = O(NlogN) due to sorting
// Space complexity = O(N) for factors array

// 1. create function that returns Euclidean factor (this is just a simplified standin for the actual distance calculation)
// 2. apply function to each point in points and push to an array along with the point's index in points
// 3. sort by factor size and slice up to k elements
// 4. use index of remaining elements to group corresponding elements in points

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
	// We don't need the actual Euclidean distance, just the factor inside the sqrt sign
	var getFactor = function (x, y) {
		return Math.abs(x) ** 2 + Math.abs(y) ** 2;
	};

	let factors = [];
	let result = [];

	for (i = 0; i < points.length; i++) {
		factors.push({ index: i, factor: getFactor(points[i][0], points[i][1]) });
	}

	let filtered = factors.sort((a, b) => a.factor - b.factor).slice(0, k);

	filtered.forEach((e) => {
		result.push(points[e.index]);
	});

	return result;
};

//javascript implementation of quickselect
function quickSelect(array, k) {
	var left = 0,
		right = array.length - 1;

	while (true) {
		if (right <= left + 1) {
			if (right === left + 1 && array[right] < array[left])
				swap(array, left, right);
			return array[k];
		} else {
			//the unsigned bitshift has the effect of dividing by 2
			//and discarding any remainder
			var middle = (left + right) >>> 1;
			swap(array, middle, left + 1);

			if (array[left] > array[right]) swap(array, left, right);

			if (array[left + 1] > array[right]) swap(array, left + 1, right);

			if (array[left] > array[left + 1]) swap(array, left, left + 1);

			var i = left + 1,
				j = right;
			var pivot = array[i];
			while (true) {
				i++;
				while (array[i] < pivot) i++;

				j--;
				while (array[j] > pivot) j--;

				if (j < i) break;
				swap(array, i, j);
			}
			array[left + 1] = array[j];
			array[j] = pivot;

			if (j >= k) right = j - 1;

			if (j <= k) left = i;
		}
	}
}

function swap(array, i, j) {
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}
