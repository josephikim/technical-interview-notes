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

// Iterative solution (quick select)

// Time complexity = O(N) on average
// Space complexity = O(1) if not counting result array

// Uses a quick select algorithm to rearrange points around the kth selection which guarantees:
// 1. all elements to the left of points[k] have smaller Euclidean distances than points[k]
// 2. points[k] has a smaller Euclidean distance than all elements to the right of points[k]

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var quickSelect = function (points, k) {
	let left = 0,
			right = points.length - 1;
	let pivotIndex = points.length;
	while (pivotIndex !== k) {
			// Repeatedly partition the array
			// while narrowing in on the kth element
			pivotIndex = partition(points, left, right);
			if (pivotIndex < k) {
					left = pivotIndex;
			} else {
					right = pivotIndex - 1;
			}
	}

	// Return the first k elements of the partially sorted array
	return points.slice(0, k);
};

var partition = function (points, left, right) {
	let pivot = chooseMidPivot(points, left, right);
	let pivotDist = squaredDistance(pivot);
	while (left < right) {
			// Iterate through the range and swap elements to make sure
			// that all points closer than the pivot are to the left
			if (squaredDistance(points[left]) >= pivotDist) {
					[points[left], points[right]] = [points[right], points[left]];
					right--;
			} else {
					left++;
			}
	}

	// Ensure the left pointer is just past the end of
	// the left range then return it as the new pivotIndex
	if (squaredDistance(points[left]) < pivotDist) {
			left++;
	}

	return left;
};

// Choose a pivot element of the array
// the unsigned bitshift has the effect of dividing by 2 and discarding any remainder
const chooseMidPivot = (points, left, right) =>
	points[left + ((right - left) >> 1)];

// Calculate and return the squared Euclidean distance
const squaredDistance = ([x, y]) => x ** 2 + y ** 2;

/***********************************/

// Iterative solution (heapify)

// Time complexity = O(N) on average
// Space complexity = O(1) if not counting result array

// Uses a custom built min heap algorithm to find and remove the element with the smallest Euclidean distance on each iteration of heapify
// Note: this does not result in a sorted list of k elements, just a collection of k-smallest elements

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
	// solution with imported datastructures library
	// let ans = [];
	// let heap = new PriorityQueue({compare:isCloserCompare});
	// for (point of points)
	//     heap.enqueue(point);
	// for (let i = 0; i < k; ++i)
	//     ans.push(heap.dequeue())
	// return ans;
	// solution for custom built heap
	let ans = [];
	// build heap
	// start loop at the last possible parent node
	for (let i = Math.trunc(points.length/2)-1; i >= 0; --i)
			heapify(points, i);
	for (let i = 0; i < k; ++i)
			ans.push(popMin(points));
	return ans;
};

// returns if p1 is closer to origin than p2
const isCloser = (p1, p2) => (p1[0]*p1[0]+p1[1]*p1[1]) < (p2[0]*p2[0]+p2[1]*p2[1]);
const isCloserCompare = (p1, p2) => (p1[0]*p1[0]+p1[1]*p1[1]) - (p2[0]*p2[0]+p2[1]*p2[1]);

const popMin = (heap) => {
	const min = heap[0];
	heap[0] = heap.pop();
	heapify(heap, 0);
	return min;
}

const heapify = (points, i) => {
	// min heap (where min means closer to origin), heapify down implementation
	while (i*2+1 < points.length) {
			let child = i*2+1;
			// choose the smaller of the children
			if (child < points.length - 1 && !isCloser(points[child], points[child+1]))
					++child;
			if (isCloser(points[child], points[i])) {
					const tmp = points[i];
					points[i] = points[child];
					points[child] = tmp;
					i = child;
			} else {
					break;
			}
	}
}

/***********************************/

// Iterative solution (improved)

// Time complexity = O(NlogN) due to sorting
// Space complexity = O(1) if not counting result array

// same logic as solution below but with less space complexity	

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
	return points.sort((a, b) => getLength(a) - getLength(b)).slice(0, k);
};
var getLength = function([a, b]) {
	return (a * a) + (b * b);
}

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
