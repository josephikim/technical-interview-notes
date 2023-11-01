/*
Insertion sort (default sort used in Array.sort())


Bubble sort

NOTE: One of the slowest sorts. Mainly just used for teaching purposes.

Algo: compares every two adjacent values and swaps them if the first one is bigger than the second one. Values move up into their correct positions like 'rising bubbles'

Stable: Y
In-place: Y
Comparison-type: Y

Time Complexity

Best: O(n)
Worst: O(n^2)
Average: O((n / 2) * n) = O(n^2 / 2) = O(n^2)

Space Complexity

O(1)

1. The iteration starts at the second element. We consider the first element sorted by default. For each iteration, we keep track of the current element.

2. Each current element will be the first element of the unsorted array - and each element before it will belong to the sorted array.

3. Through a while loop, we go through the sorted array and shift elements to the right, opening up a space for the current element to be inserted.

4. Once we find the proper place for it, the current element is inserted into the newly-opened slot. This process is repeated for each iteration until the array is sorted.

5. Time Complexity worst-case is O(n^2)
6. Time Complxity average case is O(n^2)
7. Time Complexity best case is O(n)
8. Space Complxity is O(1)
*/

function insertionSort(inputArr) {
  let n = inputArr.length;
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = inputArr[i];
    // The last element of our sorted subarray
    let j = i - 1;
    while (j > -1 && current < inputArr[j]) {
      inputArr[j + 1] = inputArr[j];
      j--;
    }
    inputArr[j + 1] = current;
  }
  return inputArr;
}

let inputArr = [5, 2, 4, 6, 1, 3];
insertionSort(inputArr);
console.log(inputArr);

/*
Merge sort (aka 'divide and conquer')

1. Split the given list into two halves (roughly equal halves in case of a list with an odd number of elements).

2. Continue dividing the subarrays in the same manner until you are left with only single element arrays.

3. Starting with the single element arrays, merge the subarrays so that each merged subarray is sorted.

4. Repeat step 3 until you end up with a single sorted array.

5. Time Complexity worst-case is O(n log n)
6. Time Complxity average case is O(n log n)
7. Time Complexity best case is O(n log n) for naive, O(n) for natural variant
8. Space Complxity is O(n) for auxillary, O(1) with linked lists
*/

// first write code to merge() two sorted subarrays into a sorted array.
function merge(left, right) {
  let result = [];
  // break out of loop if any of the subarrays becomes empty
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift()); // also handle case of left[0] === right[0]
    }
  }
  // Concatenating the leftover elements
  // (in case we didn't go through the entire left or right array)
  return [...result, ...left, ...right];
}

function mergeSort(inputArr) {
  // keep splitting arrays, until we end up with arrays that only contain one element
  const half = inputArr.length / 2;

  // Base case or terminating case
  if (inputArr.length < 2) {
    return inputArr;
  }

  // 'half' can be a floating point bc it gets converted internally to an integer via ES Abstract function ToInteger();
  // inputArr gets mutated => only second half items remain
  const left = inputArr.splice(0, half);
  return merge(mergeSort(left), mergeSort(inputArr));
}
