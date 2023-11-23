/*
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
*/

// loop through all elements
//   loop through all elements from 0 to arr.length - # of outer loops completed
//     swap positions as you go
//     if swap is not valid, continue

function bubbleSortNaive(arr, compare = defaultCompare) {
  for (let i = 0; i < arr.length; i++) {
    // each iteration of outer loop will place highest remaining number in its correct rightmost position, so inner loop only need to check elements - num of outer loops completed (and -1 to account for compare function )
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1]) === Compare.GREATER_THAN) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}

function bubbleSortOptimal(arr, compare = defaultCompare) {
  // introduce a flag variable to see if any run resulted in no swaps in which case break from outer loop ie shortcircuiting remaining unneccessary loops
  let noSwaps;
  for (let i = 0; i < arr.length; i++) {
    noSwaps = true;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1]) === Compare.GREATER_THAN) {
        swap(arr, j, j + 1);
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

const Compare = {
  LESS_THAN: -1,
  GREATER_THAN: 1,
};

function defaultCompare(a, b) {
  if (a === b) return 0;

  return a > b ? Compare.GREATER_THAN : Compare.LESS_THAN;
}

// const input = [5, 4, 3, 2, 1];
// const input = [1, 2, 3, 4, 5];
const input = [6, 2, 1, 7, 8, 3, 9];

// let result = bubbleSortNaive(input);
let result = bubbleSortOptimal(input);

console.log(result);
