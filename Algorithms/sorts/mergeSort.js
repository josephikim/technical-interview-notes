/*

Merge sort (aka 'divide and conquer')

Algo: Recursively split array into unsorted subarrays until you reach arrays of len 1, then combine them back in sorted order.

1. Split the given list into two halves (roughly equal halves in case of a list with an odd number of elements).

2. Continue dividing the subarrays in the same manner until you are left with only single element arrays.

3. Starting with the single element arrays, merge the subarrays so that each merged subarray is sorted.

4. Repeat step 3 until you end up with a single sorted array.


Stable: Y
In-place: N
Comparison-type: Y

Time Complexity

Best: O(nlogn) naive, O(n) natural variant
Worst: O(nlogn)
Average: O(nlogn)

Space Complexity

O(n) auxillary
*/

// first write code to merge() two unsorted subarrays into a sorted array.
function merge(left, right) {
  let result = [],
    leftIndex = 0,
    rightIndex = 0;

  // break out of while loop if any of the subarrays becomes empty
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      // also handles case of left[leftIndex] === right[rightIndex]
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  // Concat the leftover elements in left or right array
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSort(arr) {
  // Need base case to prevent infinite recursion
  // if arr is len 1, return arr
  if (arr.length < 2) {
    return arr;
  }

  // figure out the middle point
  // NOTE: Can do Math.floor(arr.length / 2) for explicitness, but not necessary, bc floating points used in arr.splice() get converted internally to an integer via ES Abstract function ToInteger();
  const middle = arr.length / 2;

  // Want to use slice() bc we want copies of original array not modify in place
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // recursively call mergeSort until arrays of length 1 are created, then merge them in sorted order
  return merge(mergeSort(left), mergeSort(right));
}

// const input = [5, 4, 3, 2, 1];
// const input = [1, 2, 3, 4, 5];
const input = [6, 2, 1, 7, 8, 3, 9];

let result = mergeSort(input);

console.log(result);
